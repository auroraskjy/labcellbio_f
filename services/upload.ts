import { httpClient } from "./http-client";

export interface PresignedUrlResponse {
  uploadUrl: string;
  fileUrl: string;
  s3Key: string;
}

/**
 * Fetches presigned URLs for uploading a file.
 * @param filename - Name of the file to upload.
 * @param abortSignal - Optional AbortSignal for cancellation.
 */
export const getPresignedUrl = (
  filename: string,
  abortSignal?: AbortSignal
): Promise<PresignedUrlResponse> => {
  return httpClient.get<PresignedUrlResponse>("/uploads/presigned-url", {
    params: { filename },
    signal: abortSignal,
  });
};

/**
 * Uploads a file to S3 using a presigned URL.
 * @param uploadUrl - The presigned S3 URL to PUT the file to.
 * @param file - The file to upload.
 * @param onProgress - Optional progress callback (0–100).
 * @param abortSignal - Optional AbortSignal for cancellation.
 */
export const uploadFileToS3 = (
  uploadUrl: string,
  file: File,
  onProgress: (percent: number) => void = () => {},
  abortSignal?: AbortSignal
): Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    if (abortSignal) {
      abortSignal.addEventListener(
        "abort",
        () => {
          xhr.abort();
          reject(new Error("Upload cancelled"));
        },
        { once: true }
      );
    }

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const percent = Math.round((event.loaded / event.total) * 100);
        onProgress(percent);
      }
    };

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve();
      } else {
        reject(new Error(`Upload failed with status: ${xhr.status}`));
      }
    };

    xhr.onerror = () => reject(new Error("Upload failed"));

    xhr.open("PUT", uploadUrl);
    xhr.setRequestHeader("Content-Type", file.type);
    xhr.send(file);
  });
};

interface PostCompleteUrlRequest {
  filename: string;
  originalName: string;
  fileUrl: string;
  s3Key: string;
  contentType: string;
  fileSize: number;
}

interface PostCompleteUrlResponse {
  success: boolean;
  uploadId: number;
  upload: {
    description: string;
  };
  permanentUrl: string;
  message: string;
}

export const postCompleteUrl = (request: PostCompleteUrlRequest) => {
  return httpClient.post<PostCompleteUrlResponse>(
    "/uploads/complete-upload",
    request
  );
};
