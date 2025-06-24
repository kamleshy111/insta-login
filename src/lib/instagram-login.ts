export function instagramLogin(account_id?: string) {
  const clientId = process.env.NEXT_PUBLIC_INSTAGRAM_CLIENT_ID;
  console.log(clientId);
  const redirectUri = `https://insta-login-omega.vercel.app/api/auth/callback/instagram`;
  //const redirectUri = `https://krtechweb.com/instagram-login/callback.php`;

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
    `https://www.instagram.com/oauth/authorize?` +
    `force_reauth=true&` +
    `client_id=${clientId}&` +
    `redirect_uri=${encodeURIComponent(redirectUri)}&` +
      `scope=instagram_business_basic%2Cinstagram_business_manage_messages%2Cinstagram_business_manage_comments%2Cinstagram_business_content_publish%2Cinstagram_business_manage_insights&` +
      `response_type=code&`;

  // Redirect in the same window instead of opening new tab
  window.location.href = authUrl;
} 