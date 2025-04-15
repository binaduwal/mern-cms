import * as yup from 'yup';

export const validationSchema = yup.object({
  title: yup
    .string()
    .required("Title is required")
    .min(5, "Title must be at least 5 characters long")
    .max(100, "Title must be less than 100 characters"),
  
  slug: yup
    .string()
    .required("Slug is required")
    .min(5, "Slug must be at least 5 characters long")
    .max(100, "Slug must be less than 100 characters"),
  
  url: yup
    .string()
    .required("URL is required")
    .url("Invalid URL format")
});
