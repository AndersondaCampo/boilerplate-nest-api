# COPY --chown=node:node --from=build /app/dist ./dist
# COPY --chown=node:node --from=build /app/node_modules ./node_modules
# COPY --chown=node:node --from=build /app/package*.json ./
# COPY --chown=node:node --from=build /app/ecosystem.config.js ./
# COPY --chown=node:node --from=build /app/prisma ./prisma