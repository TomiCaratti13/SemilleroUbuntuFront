import { useState } from "react";

import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { redirect, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";

import DialogAlert from "../../DialogAlert/DialogAlert";
import UploadImages from "./UploadImages";
import uploadAndEditPublicationSchema from "../../../schemas/uploadAndEditPublicationSchema";
import { deleteToken, getToken } from "../../../utils/LoginToken";
import useSetPublications from "../../../hooks/useSetPublications";
import { setSignOut } from "../../../redux/slices/userSlice";
import { setGlobalDialog } from "../../../redux/slices/globalDialogSlice";

const UploadPublication = () => {
  const [images, setImages] = useState([]);

  const theme = useTheme();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState({
    title: "",
    message: "",
    state: null,
  });
  const token = getToken();
  const user = useSelector((state) => state.user);
  const { getAdminPublications } = useSetPublications();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      title: "",
      content: "",
    },
    validationSchema: uploadAndEditPublicationSchema,
    onSubmit: async (values) => {
      try {
        formik.setSubmitting(true);

        values.title
          .split(" ")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");

        const imagesToSend = images.filter((image) => image.file);

        const dataToSend = {
          user_id: user.id,
          title: values.title,
          content: values.content,
          hidden: false,
          date: new Date().toISOString().split("T")[0],
          visualizations: 0,
        };

        const formData = new FormData();

        Object.keys(dataToSend).forEach((key) => {
          if (dataToSend[key]) {
            formData.append(key, dataToSend[key]);
          }
        });

        imagesToSend.forEach((image) => {
          formData.append("images", image.file);
        });

        await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/Publications/save`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        formik.setSubmitting(false);

        getAdminPublications();

        setDialogContent({
          title: "Publicación creada con éxito",
          state: "success",
        });

        setOpen(true);
      } catch (error) {
        formik.setSubmitting(false);
        console.log(error);

        if (error.response && error.response.status === 401) {
          deleteToken();
          dispatch(setSignOut());
          dispatch(
            setGlobalDialog({
              open: true,
              title: "Token expirado, inicie sesión nuevamente",
              state: "error",
            })
          );
          redirect("/acceso");
        } else {
          setDialogContent({
            title: "Lo sentimos, la publicación no pudo ser creada.",
            message: "Por favor, volvé a intentarlo.",
            state: "error",
          });
          setOpen(true);
        }
      }
    },
  });

  const disabledButton =
    Object.keys(formik.errors).length > 0 ||
    formik.isSubmitting ||
    images.length === 0;

  return (
    <>
      <DialogAlert
        open={open}
        handleClose={() => {
          if (dialogContent.state === "success") {
            setOpen(false);
            navigate("/dashboard/publicaciones");
          } else {
            setOpen(false);
          }
        }}
        title={dialogContent.title}
        message={dialogContent.message}
        state={dialogContent.state}
      />

      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mb: "31px",
        }}
        maxWidth={"md"}
      >
        <Typography fontSize={"28px"} fontWeight={600} mt={13} mb={"32px"}>
          Carga de publicación
        </Typography>

        <Typography
          fontSize={"20px"}
          fontWeight={600}
          mb={"24px"}
          textAlign={"center"}
        >
          Completá los datos para crear una nueva publicación
        </Typography>

        <Box
          component="form"
          onSubmit={formik.handleSubmit}
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            mb: "32px",
            gap: "16px",
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            name="title"
            margin="dense"
            fullWidth
            required
            label="Título"
            helperText={
              formik.touched.title && formik.errors.title
                ? formik.errors.title
                : "Se visualizará en el título de la publicación"
            }
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.title && Boolean(formik.errors.title)}
            disabled={formik.isSubmitting}
            sx={{
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#222",
              },

              "& .MuiFormLabel-root": {
                color: (theme) =>
                  formik.touched.title && formik.errors.title
                    ? theme.palette.error.main
                    : "#222 !important",
              },

              "& .MuiInputLabel-root.Mui-focused": {
                color: (theme) =>
                  formik.touched.title && formik.errors.title
                    ? theme.palette.error.main
                    : `${theme.palette.primary.main} !important`,
              },

              "& .MuiFormHelperText-root": {
                color: (theme) =>
                  formik.touched.title && formik.errors.title
                    ? theme.palette.error.main
                    : "#222 !important",
              },

              "& .Mui-disabled": {
                color: (theme) => `${theme.palette.primary.main} !important`,
              },
            }}
            InputProps={{
              sx: {
                "& .Mui-disabled": {
                  WebkitTextFillColor: "#222 !important",
                },
              },
            }}
          />

          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "4px",
            }}
          >
            <TextField
              name="content"
              variant="outlined"
              multiline
              minRows={5}
              maxRows={theme.breakpoints.up("md") ? 12 : 6}
              autoComplete="off"
              fullWidth
              type="text"
              required
              value={formik.values.content}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.content && Boolean(formik.errors.content)}
              label={"Ingresá el contenido de la publicación"}
              disabled={formik.isSubmitting}
              sx={{
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#222",
                },

                "& .MuiFormLabel-root": {
                  color: (theme) =>
                    formik.touched.content && formik.errors.content
                      ? theme.palette.error.main
                      : "#222 !important",
                },

                "& .MuiInputLabel-root.Mui-focused": {
                  color: (theme) =>
                    formik.touched.content && formik.errors.content
                      ? theme.palette.error.main
                      : `${theme.palette.primary.main} !important`,
                },

                "& .MuiFormHelperText-root": {
                  color: (theme) =>
                    formik.touched.content && formik.errors.content
                      ? theme.palette.error.main
                      : "#222 !important",
                },

                "& .Mui-disabled": {
                  color: (theme) => `${theme.palette.primary.main} !important`,
                },
              }}
              InputProps={{
                sx: {
                  "& .Mui-disabled": {
                    WebkitTextFillColor: "#222 !important",
                  },
                },
              }}
            />

            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                margin: "4px",
                paddingX: "10px",
              }}
            >
              <Typography
                fontSize={"13px"}
                fontWeight={400}
                maxWidth={"85%"}
                color={(theme) =>
                  formik.touched.content && formik.errors.content
                    ? theme.palette.error.main
                    : "#222"
                }
              >
                {formik.touched.content && formik.errors.content
                  ? formik.errors.content
                  : "Máximo 2000 caracteres"}
              </Typography>
              <Typography
                fontSize={"13px"}
                fontWeight={400}
                color={(theme) =>
                  formik.touched.content && formik.errors.content
                    ? theme.palette.error.main
                    : "#222"
                }
              >
                {formik.values.content.length}/2000
              </Typography>
            </Box>
          </Box>

          <UploadImages images={images} setImages={setImages} />

          <Button
            type="submit"
            sx={{
              width: { xs: "100%", sm: "200px" },
              backgroundColor: (theme) =>
                disabledButton
                  ? theme.palette.secondary.main
                  : theme.palette.primary.main,
              color: (theme) => theme.palette.text.white,
              borderRadius: "100px",
              fontSize: "16px",
              fontWeight: 400,
              textTransform: "none",
              "&:hover": {
                backgroundColor: (theme) => theme.palette.primary.main,
                filter: "brightness(0.9)",
                transition: "all 0.3s ease",
              },

              "&:active": {
                transform: "scale(0.98)",
              },

              "&:disabled": {
                color: (theme) => theme.palette.text.white,
                cursor: "not-allowed",
              },
            }}
            disabled={disabledButton}
          >
            Crear publicación
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default UploadPublication;
