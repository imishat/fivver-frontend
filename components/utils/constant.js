
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
// Create project
export const CREATE_DESIGN="designs";
// categories
export const GET_CATEGORIES ="categories"
// subcategories
export const GET_SUBCATEGORIES ="subcategories"
// file upload
export const UPLOAD_FILE="files"
// get file by id
export const GET_FILE_BY_ID = 'files/:id'
// designs
export const GET_DESIGNS="designs"
// companies
export const COMPANIES="companies"
// tags
export const TAGS="tags"
// get user
export const GET_USER = 'users/profile'