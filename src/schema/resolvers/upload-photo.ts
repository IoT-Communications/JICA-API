import { Bucket } from "@google-cloud/storage";
import { FileUpload } from "graphql-upload";

export const processUpload = async (upload: FileUpload, plugBucket: Bucket) => {
    const { createReadStream, filename, mimetype } = await upload
    const stream = createReadStream()
    await new Promise((resolve, reject) =>
        stream
            .pipe(
                plugBucket.file(`${filename}`).createWriteStream({
                    resumable:false,
                    gzip:true
                })
                
            )
            .on('finish', resolve)
            .on('error', reject),
    )
    return { 'path': `https://storage.googleapis.com/plug_bucket/${filename}` };
}

export async function deleteFile (path: string, plugBucket: Bucket) {
    let filename = path.substring(path.lastIndexOf('/')+1,path.length)
    await plugBucket.file(filename).delete();
}  