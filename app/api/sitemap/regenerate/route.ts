import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function POST(request: NextRequest) {
  try {
    // sitemap.xml 경로 재검증
    revalidatePath("/sitemap.xml");
    
    return NextResponse.json({ 
      success: true, 
      message: "Sitemap regenerated successfully",
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error("Failed to regenerate sitemap:", error);
    return NextResponse.json(
      { 
        success: false, 
        message: "Failed to regenerate sitemap" 
      },
      { status: 500 }
    );
  }
}
