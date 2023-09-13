import { UploadFotoLayout } from "@/app_modules/katalog";

export default function Layout({children}: {children: any}){
    return<>
    <UploadFotoLayout>{children}</UploadFotoLayout>
    </>
}