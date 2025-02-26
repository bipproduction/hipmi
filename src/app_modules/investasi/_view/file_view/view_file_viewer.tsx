"use client";

import { useEffect, useState } from "react";
import { getDocument, GlobalWorkerOptions } from "pdfjs-dist";
import { Image, Skeleton, Stack, Text } from "@mantine/core";
import { RouterInvestasi_OLD } from "@/lib/router_hipmi/router_investasi";

GlobalWorkerOptions.workerSrc =
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.6.82/pdf.worker.min.mjs";

const PdfToImage = ({ id, path }: { id: string; path: string }) => {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const renderPages = async () => {
        try {
          const loadingTask = getDocument(path + id); // Menggunakan md sebagai URL PDF
          const pdf = await loadingTask.promise;
          const numPages = pdf.numPages;
          const imagePromises: Promise<string>[] = [];

          for (let pageNum = 1; pageNum <= numPages; pageNum++) {
            const renderPage = async (pageNum: number): Promise<string> => {
              const page = await pdf.getPage(pageNum);
              const viewport = page.getViewport({ scale: 2.0 });

              // Buat elemen canvas
              const canvas = document.createElement("canvas");
              const context = canvas.getContext("2d");
              if (context) {
                canvas.width = viewport.width;
                canvas.height = viewport.height;

                // Render halaman PDF ke dalam canvas
                const renderContext = {
                  canvasContext: context,
                  viewport: viewport,
                };
                await page.render(renderContext).promise;

                // Konversi canvas ke gambar (data URL)
                return canvas.toDataURL("image/png");
              }
              return "";
            };

            imagePromises.push(renderPage(pageNum));
          }

          const imageSrcs = await Promise.all(imagePromises);
          setImages(imageSrcs);
        } catch (error) {
          console.error("Error rendering PDF to images:", error);
        } finally {
          setLoading(false);
        }
      };

      renderPages();
    }
  }, [id, path]);

  return (
    <Stack>
      {loading ? (
        <CustomLoading />
      ) : (
        images.map((src, index) => (
          <Image key={index} src={src} alt={`Page ${index + 1}`} />
        ))
      )}
    </Stack>
  );
};

function CustomLoading() {
  return (
    <Stack p="md">
      {[...Array(3)].map((_, index) => (
        <Skeleton key={index} height={500} />
      ))}
    </Stack>
  );
}

export default PdfToImage;
