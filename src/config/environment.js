module.exports = {
  port: process.env.PORT || 5000,
  jwtAccessTokenSecret:
    process.env.JWT_ACCESS_TOKEN_SECRET ||
    '96b82eb422d2b8b3b8988df5fe344fa7841f9aec4aaefe7791dbb7ffc9a8deb1',
  jwtRefreshTokenSecret:
    process.env.JWT_REFRESH_TOKEN_SECRET ||
    'ce2974b8e7696ef54396da4a4f5139afe24960110e1a816531d38e43879373a6',
};
