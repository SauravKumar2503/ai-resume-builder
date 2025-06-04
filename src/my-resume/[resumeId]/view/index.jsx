// import Header from '@/components/custom/Header'
// import React,{ useState,useEffect } from 'react'
// import { Button } from '@/components/ui/Button'
// import ResumePreview from '@/dashboard/resume/components/ResumePreview'
// import { ResumeInfoContext } from '@/context/ResumeInfoContext'
// import { useParams } from 'react-router-dom'
// import GlobalApi from './../../../../service/GlobalApi'

// function ViewResume() {

//   const [resumeInfo,setResumeInfo]=useState();
//   const{resumeId}=useParams();

//   useEffect(()=>{
//     GetResumeInfo();
//   })

//   const GetResumeInfo=()=>{
//     GlobalApi.GetResumeById(resumeId).then(resp=>{
//       console.log(resp.data.data);
//       setResumeInfo(resp.data.data);
//     })
//   }

//   const HandleDownload = () => {
//     window.print();
//   };

//   return (
//     <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
//       <div id="no-print">
//         <Header />

//         <div className="my-10 mx-10 md:mx-2= lg:mx-36">
//           <h2 className="text-center text-2xl font-medium">
//             Congrats! Your Ultimate AI generates Resume is ready!
//           </h2>

//           <p className="text-center text-gray-500">
//             You can download or share your resume with others.
//           </p>

//           <div className="flex justify-between px-44 my-10">
//             <Button onClick={HandleDownload}>Dowland</Button>
//             <Button>Share</Button>
//           </div>
//         </div>
//       </div>
//       <div className='my-10 mx-10 md:mx-20 lg:mx-36'>
//         <div id="print-area">
//           <ResumePreview />
//         </div>
//       </div>
//     </ResumeInfoContext.Provider>
//   );
// }

// export default ViewResume






import Header from '@/components/custom/Header';
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import ResumePreview from '@/dashboard/resume/components/ResumePreview';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { useParams } from 'react-router-dom';
import GlobalApi from './../../../../service/GlobalApi';

// Import from react-share
import {
  FacebookShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
  TwitterShareButton,
  FacebookIcon,
  LinkedinIcon,
  WhatsappIcon,
  TwitterIcon,
} from 'react-share';

function ViewResume() {
  const [resumeInfo, setResumeInfo] = useState();
  const { resumeId } = useParams();

  useEffect(() => {
    GetResumeInfo();
  }, []); // Add dependency array to avoid infinite calls

  const GetResumeInfo = () => {
    GlobalApi.GetResumeById(resumeId).then((resp) => {
      console.log(resp.data.data);
      setResumeInfo(resp.data.data);
    });
  };

  const HandleDownload = () => {
    window.print();
  };

  // Construct shareable URL (adjust base as needed)
  const shareUrl = `${window.location.origin}/view-resume/${resumeId}`;

  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <div id="no-print">
        <Header />

        <div className="my-10 mx-10 md:mx-20 lg:mx-36">
          <h2 className="text-center text-2xl font-medium">
            Congrats! Your Ultimate AI-generated Resume is ready!
          </h2>

          <p className="text-center text-gray-500">
            You can download or share your resume with others.
          </p>

          <div className="flex flex-col md:flex-row gap-4 justify-between px-10 md:px-20 my-10">
            <Button onClick={HandleDownload}>Download</Button>

            <div className="flex gap-3 items-center">
              <FacebookShareButton url={shareUrl}>
                <FacebookIcon size={32} round />
              </FacebookShareButton>

              <TwitterShareButton url={shareUrl}>
                <TwitterIcon size={32} round />
              </TwitterShareButton>

              <LinkedinShareButton url={shareUrl}>
                <LinkedinIcon size={32} round />
              </LinkedinShareButton>

              <WhatsappShareButton url={shareUrl}>
                <WhatsappIcon size={32} round />
              </WhatsappShareButton>
            </div>
          </div>
        </div>
      </div>

      <div className="my-10 mx-10 md:mx-20 lg:mx-36">
        <div id="print-area">
          <ResumePreview />
        </div>
      </div>
    </ResumeInfoContext.Provider>
  );
}

export default ViewResume;
