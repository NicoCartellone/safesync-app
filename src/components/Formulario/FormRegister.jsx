import { Formik } from "formik";
import { TextInput, TouchableOpacity, Text, Alert } from "react-native";
import Styles from "./FormStyle";
import * as Yup from "yup";
import { useContext } from "react";
import { UserContext } from "../../context/UserProvider";

const formularioScheme = Yup.object().shape({
  nombreCompleto: Yup.string()
    .required("Campo obligatorio")
    .min(6, "Minimo 6 caracteres")
    .max(40, "Maximo 40 caracteres"),
  email: Yup.string()
    .email("Formato de email no valido")
    .trim("No debe contener espacion en blanco")
    .required("Campo obligatorio"),
  password: Yup.string()
    .trim("No debe contener espacion en blanco")
    .min(4, "Minimo 4 caracteres")
    .max(8, "Maximo 8 caracteres")
    .required("Campo obligatorio"),
  repassword: Yup.string()
    .required("Campo obligatorio")
    .trim("No debe contener espacion en blanco")
    .oneOf([Yup.ref("password"), null], "Las contraseñas deben coincidir"),
});

const FormRegister = () => {
  const { registerUser } = useContext(UserContext);

  const handleSubmit = async (values) => {
    registerUser(values.email, values.password, values.nombreCompleto);
  };

  return (
    <Formik
      initialValues={{
        nombreCompleto: "",
        email: "",
        password: "",
        repassword: "",
      }}
      validationSchema={formularioScheme}
      onSubmit={handleSubmit}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
      }) => (
        <>
          <TextInput
            placeholder="Ingrese nombre y apellido"
            style={
              errors.nombreCompleto && touched.nombreCompleto
                ? Styles.textInputError
                : Styles.textInput
            }
            placeholderTextColor="black"
            onChangeText={handleChange("nombreCompleto")}
            onBlur={handleBlur("nombreCompleto")}
            value={values.nombreCompleto}
          />

          {errors.nombreCompleto && touched.nombreCompleto ? (
            <Text style={Styles.textError}>{errors.nombreCompleto}</Text>
          ) : null}

          <TextInput
            placeholder="Ingrese email"
            style={
              errors.email && touched.email
                ? Styles.textInputError
                : Styles.textInput
            }
            placeholderTextColor="black"
            onChangeText={handleChange("email")}
            onBlur={handleBlur("email")}
            value={values.email}
          />

          {errors.email && touched.email ? (
            <Text style={Styles.textError}>{errors.email}</Text>
          ) : null}

          <TextInput
            secureTextEntry={true}
            placeholder="Ingrese contraseña"
            style={
              errors.password && touched.password
                ? Styles.textInputError
                : Styles.textInput
            }
            placeholderTextColor="black"
            onChangeText={handleChange("password")}
            onBlur={handleBlur("password")}
            value={values.password}
          />

          {errors.password && touched.password ? (
            <Text style={Styles.textError}>{errors.password}</Text>
          ) : null}

          <TextInput
            secureTextEntry={true}
            placeholder="Repita contraseña"
            style={
              errors.repassword && touched.repassword
                ? Styles.textInputError
                : Styles.textInput
            }
            placeholderTextColor="black"
            onChangeText={handleChange("repassword")}
            onBlur={handleBlur("repassword")}
            value={values.repassword}
          />

          {errors.repassword && touched.repassword ? (
            <Text style={Styles.textError}>{errors.repassword}</Text>
          ) : null}

          <TouchableOpacity style={Styles.buttonForm} onPress={handleSubmit}>
            <Text style={Styles.text}>Registrarme</Text>
          </TouchableOpacity>
        </>
      )}
    </Formik>
  );
};
export default FormRegister;
