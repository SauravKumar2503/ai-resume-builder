// import FormSection from '../../components/FormSection'
// import ResumePreview from '../../components/ResumePreview'
// import React, {useEffect, useState} from 'react'
// import { useParams } from 'react-router-dom'
// import { ResumeInfoContext} from '@/context/ResumeInfoContext';
// import dummy from '@/data/dummy';

// function EditResume() {

//   const params = useParams()
//   const [resumeInfo,setResumeInfo]=useState();

//   useEffect(() => {
//     setResumeInfo(dummy);
//   },[])

//   return (
//     <ResumeInfoContext.Provider value={{resumeInfo,setResumeInfo}}>
//     <div className='grid grid-cols-1 md:grid-cols-2 p-10 gap-10'>

//       {/* Form Section */}
//         <FormSection />
//       {/* Preview Section */}
//         <ResumePreview />
//     </div>
//     </ResumeInfoContext.Provider>
//   )
// }

// export default EditResume




import FormSection from '../../components/FormSection'
import ResumePreview from '../../components/ResumePreview'
import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import { ResumeInfoContext} from '@/context/ResumeInfoContext';
import dummy from '@/data/dummy';
import GlobalApi from '../../../../../service/GlobalApi';

function EditResume() {

  const {resumeId} = useParams()
  const [resumeInfo,setResumeInfo]=useState(null);

  useEffect(() => {
    //setResumeInfo(dummy);
    GetResumeInfo();
  },[])

  const GetResumeInfo=()=>{
    GlobalApi.GetResumeById(resumeId)
    .then(resp=>{
      console.log(resp.data.data)
      //If i comment out the next line, The colour of all the heading like in the top pf the pafe or red colour will come.
     setResumeInfo(resp.data.data);
    })
    .catch((error) => {
      console.error('Failed to fetch resume, using dummy:', error);
      setResumeInfo(dummy); // ✅ Fallback to dummy if API fails
    });
  }

  if (!resumeInfo) return <div className="p-10">Loading...</div>

  return (
    <ResumeInfoContext.Provider value={{resumeInfo,setResumeInfo}}>
    <div className='grid grid-cols-1 md:grid-cols-2 p-10 gap-10'>

      {/* Form Section */}
        <FormSection />
      {/* Preview Section */}
        <ResumePreview />
    </div>
    </ResumeInfoContext.Provider>
  )
}

export default EditResume




