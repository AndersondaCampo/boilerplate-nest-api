import { Job } from "bull";
import { BackgroundEventHandler, BackgroundEventsHandler } from "../../background-event-handler";
import { CreatedVerificationTokenEvent } from "src/domain/users/events/created-verification-token.event";
import { EmailService } from "src/integrations/email/email.service";
import { ConfigService } from "@nestjs/config";

@BackgroundEventsHandler(
  CreatedVerificationTokenEvent,
  'auth',
  'send-magic-link',
)
export class Auth_SendMagicLinkHandler extends BackgroundEventHandler<CreatedVerificationTokenEvent> {
  constructor(
    private readonly configService: ConfigService,
    private readonly emailService: EmailService,
  ) {
    super();
  }

  async processJob(job: Job<CreatedVerificationTokenEvent>): Promise<void> {
    const { token, userEmail } = job.data;

    const url = `${this.configService.get('APP_URL')}/auth/verify-email?token=${token}&email=${userEmail}`;
    const host = this.configService.get('APP_URL')

    await this.emailService.sendEmail({
      to: [userEmail],
      subject: "Faça login em sua conta",
      content: {
        text: text({ url, host }),
        html: html({ url, host }),
      },
      category: "auth",
    });
  }
}

function text({ url, host }: { url: string, host: string }) {
  return `Clique no link para acessar: ${url}`
}

function html({ url, host }: { url: string, host: string }) {
  const escapedHost = host.replace(/\./g, "&#8203;.")

  const brandColor = "#346df1"
  const color = {
    background: "#f9f9f9",
    text: "#444",
    mainBackground: "#fff",
    buttonBackground: brandColor,
    buttonBorder: brandColor,
    buttonText: "#fff",
  }

  return `
<body style="background: ${color.background};">
  <table width="100%" border="0" cellspacing="20" cellpadding="0"
    style="background: ${color.mainBackground}; max-width: 600px; margin: auto; border-radius: 10px;">
    <tr>
      <td align="center"
        style="padding: 10px 0px; font-size: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
        Faça login em <strong>${escapedHost}</strong>
      </td>
    </tr>
    <tr>
      <td align="center" style="padding: 20px 0;">
        <table border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td align="center" style="border-radius: 5px;" bgcolor="${color.buttonBackground}"><a href="${url}"
                target="_blank"
                style="font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: ${color.buttonText}; text-decoration: none; border-radius: 5px; padding: 10px 20px; border: 1px solid ${color.buttonBorder}; display: inline-block; font-weight: bold;">Sign
                in</a></td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td align="center"
        style="padding: 0px 0px 10px 0px; font-size: 16px; line-height: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
        Se você não solicitou este e-mail, pode ignorá-lo com segurança.
      </td>
    </tr>
  </table>
</body>
`
}