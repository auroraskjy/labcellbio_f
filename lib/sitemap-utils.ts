/**
 * Sitemap 재생성 함수
 */
export async function regenerateSitemap(): Promise<boolean> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/sitemap/regenerate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result.success;
  } catch (error) {
    console.error('Failed to regenerate sitemap:', error);
    return false;
  }
}

/**
 * 게시글 생성/수정/삭제 시 sitemap 재생성
 */
export async function triggerSitemapRegeneration(): Promise<void> {
  // 개발 환경에서는 즉시 재생성
  if (process.env.NODE_ENV === 'development') {
    await regenerateSitemap();
    return;
  }

  // 프로덕션 환경에서는 비동기로 재생성 (성능 고려)
  regenerateSitemap().catch(error => {
    console.error('Background sitemap regeneration failed:', error);
  });
}
