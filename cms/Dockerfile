FROM node:24-bookworm-slim

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN PAYLOAD_SECRET=build-only-secret DATABASE_URL=postgresql://build:build@127.0.0.1:5432/build npm run build
RUN rm -rf .next/cache && install -d -o node -g node .next/cache && chown node:node .next

ENV NODE_ENV=production
EXPOSE 3000
USER node
CMD ["npm", "run", "start", "--", "--hostname", "0.0.0.0", "--port", "3000"]
