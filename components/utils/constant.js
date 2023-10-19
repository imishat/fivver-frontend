
export const queryClientOptions = {
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
};

// all api put here to curd oparetion

//USER CREATE ACCOUNT 
export const USER_CREATE_ACCOUNT="users/signup";
//singup 
export const SING_UP="users/login";
// user send OTp
export const USER_SEND_OTP='/users/otp'
//user verify 

export const GET_USER_VERIFY='users/verify'
//get admin status
export const GET_ADMIN_STATS ='users/admin/stats'
// Create project
export const CREATE_DESIGN="designs"
// inquiries
export const INQUIRIES="inquiries"
// categories
export const GET_CATEGORIES ="categories"
// subcategories
export const GET_SUBCATEGORIES ="subcategories"
// file upload
export const UPLOAD_FILE="files"
// get file by id
export const GET_FILE_BY_ID = 'files'
// designs
export const GET_DESIGNS="designs"
// companies
export const COMPANIES="companies"
// tags
export const TAGS="tags"
// get user
export const GET_USER = 'users/profile'
// Porject path
export const PROJECTS="projects"

export const MANY_PROJECTS="projects/create-many"
// password
export const PASSWORD = 'users/password'
// quick response 
export const QUICK_RESPONSE = 'quick-responses'

// messages
export const MESSAGES = 'messages'
// statistics
export const STATISTICS = 'projects/statistics'
// visitors
export const VISITORS = 'visitors/count'
//reviews
export const REVIEWS='/reviews'