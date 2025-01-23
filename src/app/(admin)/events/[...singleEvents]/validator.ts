import * as Yup from "yup";


export const validationSchema = Yup.object({
    name: Yup.string().required("Event name is required"),
    description: Yup.string().required("Description is required"),
    startTime: Yup.date().required("Start date is required"),
    endTime: Yup.date()
      .required("End date is required"),
    image: Yup.string().required("Event image is required"),
  });