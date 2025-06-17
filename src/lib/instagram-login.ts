export function instagramLogin(account_id?: string) {
  const clientId = process.env.NEXT_PUBLIC_INSTAGRAM_CLIENT_ID;
  const redirectUri = `${process.env.NEXT_PUBLIC_URL}/api/auth/callback/instagram`;

  // Instagram Basic Display API scopes
  const scopes = [
    "user_profile", // Basic profile information
    "user_media", // Access to user's media
  ];

  // Get current path to redirect back after authentication
  const currentPath = window.location.pathname + window.location.search;

  // Create state object with path and account_id
  const stateData = {
    path: currentPath,
    account_id,
  };

  const authUrl =
    `https://api.instagram.com/oauth/authorize?` +
    `client_id=${clientId}&` +
    `redirect_uri=${encodeURIComponent(redirectUri)}&` +
    `scope=${encodeURIComponent(scopes.join(","))}&` +
    `response_type=code&` +
    `state=${encodeURIComponent(JSON.stringify(stateData))}`;

  window.open(authUrl, "_blank");
} 