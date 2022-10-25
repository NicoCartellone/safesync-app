import { Formik } from "formik";
import * as Yup from "yup";

import { TextInput, TouchableOpacity, Text } from "react-native";
import Styles from "./FormStyle";

import { useContext } from "react";
import { UserContext } from "../../context/UserProvider";

const formularioScheme = Yup.object().shape({
  email: Yup.string()
    .email("Formato de email no valido")
    .trim("No debe contener espacion en blanco")
    .required("Campo obligatorio"),
  password: Yup.string()
    .trim("No debe contener espacion en blanco")
    .min(4, "Minimo 4 caracteres")
    .max(8, "Maximo 8 caracteres")
    .required("Campo obligatorio"),
});

const FormLogin = () => {
  const { loginUser } = useContext(UserContext);

  const handleSubmit = (values) => {
    loginUser(values.email, values.password);
  };

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
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
            style={
              errors.email && touched.email
                ? Styles.textInputError
                : Styles.textInput
            }
            placeholder="Ingrese email"
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
            style={
              errors.password && touched.password
                ? Styles.textInputError
                : Styles.textInput
            }
            placeholder="Ingrese contraseña"
            placeholderTextColor="black"
            onChangeText={handleChange("password")}
            onBlur={handleBlur("password")}
            value={values.password}
          />

          {errors.password && touched.password ? (
            <Text style={Styles.textError}>{errors.password}</Text>
          ) : null}

          <TouchableOpacity style={Styles.buttonForm} onPress={handleSubmit}>
            <Text style={Styles.text}>Iniciar Sesión</Text>
          </TouchableOpacity>
        </>
      )}
    </Formik>
  );
};
export default FormLogin;
