import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from 'reactstrap';

const Image = ({ src }) => (
    <img src={src} className="img-circle elevation-2 mb-4 mr-2 mb-2" width="100" height="100" alt="Broken" />
);

const FileUpload = ({ name, filePath, setFieldValue, responseCallback, endpoint, isSubmitting }) => {

    let [files, setFiles] = useState([]);
    let PreviewComponent = Image;

    useEffect(() => {
        setFiles(filePath)
    }, [filePath]);

    let fileInput = React.createRef();

    const handleFileChange = (e) => {
        if (!e.target.files) {
            return;
        }
        let files = e.target.files;
        // Preview file before upload.
        // setBlob(URL.createObjectURL(files));

        let data = new FormData();
        // field name of the file input field. 
        // data.append(name, file);
        for (let i = 0; i < files.length; i++) {
            data.append(name, files[i]);
        }

        (async () => {
            try {
                // disable
                if (typeof isSubmitting === "function") {
                    isSubmitting(true);
                }
                let res = await axios.post(endpoint, data);
                if (res && typeof isSubmitting === "function") {
                    isSubmitting(false);
                }
                setFiles(res.data?.data?.filePath)
                responseCallback(res.data);
                setFieldValue(name, res.data?.data?.filePath);
            } catch (error) {
                console.error(error);
                if (typeof isSubmitting === "function") {
                    isSubmitting(false);
                }
            }
        })();
    }

    return (
        <React.Fragment>
            <div>
                {files.length > 0 && files.map(f => {
                    if (!f.includes('placeholder')) {
                        return <PreviewComponent src={process.env.REACT_APP_API_BASE_URL+ '/' + f} />;
                    } else {
                        return (
                            <PreviewComponent src={f} />
                        );
                    }
                })}
            </div>
            <input
                ref={fileInput}
                type="file"
                name={name}
                onChange={handleFileChange}
                multiple
                style={{ display: "none" }}
            />

            <Button onClick={() => fileInput?.current.click()}>Browse</Button>
        </React.Fragment>
    );
}

export default FileUpload;