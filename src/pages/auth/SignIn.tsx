import React, { useState } from "react";
import styled from "styled-components";
// import { Link } from "react-router-dom";
import { useFormik } from "formik";

import {
  FormControl,
  TextField,
  Button,
  Paper,
  Typography,
  CircularProgress,
  Snackbar
} from "@material-ui/core";
import firebaseApp from "../../firebase/firebase";
import * as Yup from "yup";
import { Redirect } from "react-router-dom";

const Wrapper = styled(Paper)`
  padding: ${props => props.theme.spacing(6)}px;

  ${props => props.theme.breakpoints.up("md")} {
    padding: ${props => props.theme.spacing(10)}px;
  }
`;

const ButtonWrapper = styled.div`
  margin-top: 24px;
`;

function SignIn() {
  const [redirect, setRedirect] = useState();
  const [message, setMessage] = useState(null);

  const SigninSchema = Yup.object().shape({
    email: Yup.string()
      .email("이메일 형식이 아닙니다.")
      .required("필수 항목입니다."),
    password: Yup.string()
      .min(6, "비밀번호는 6자 이상이어야 합니다.")
      .required("필수 항목입니다.")
  });

  const {
    values,
    handleSubmit,
    handleChange,
    errors,
    touched,
    isSubmitting
  } = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: SigninSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const user = await firebaseApp
          .auth()
          .signInWithEmailAndPassword(values.email, values.password);

        setRedirect("/");
      } catch (e) {
        console.log(e);
        setMessage(e.message);
      }
    }
  });

  if (redirect) {
    return <Redirect to={redirect} />;
  }

  return (
    <Wrapper>
      <Typography component="h1" variant="h4" align="center" gutterBottom>
        BounceCode Hexa
      </Typography>
      <Typography component="h2" variant="body1" align="center">
        발급받으신 아이디로 로그인해주세요.
      </Typography>
      <form onSubmit={handleSubmit}>
        <Snackbar
          open={Boolean(message)}
          onClose={() => setMessage(null)}
          message={message}
        />
        <FormControl margin="normal" required fullWidth>
          <TextField
            id="email"
            type="email"
            name="email"
            label="이메일 주소"
            autoComplete="email"
            onChange={handleChange}
            value={values.email}
            helperText={touched.email ? errors.email : ""}
            error={touched.email && Boolean(errors.email)}
            required
            autoFocus
          />
        </FormControl>
        <FormControl margin="normal" required fullWidth>
          <TextField
            id="password"
            type="password"
            name="password"
            label="비밀번호"
            autoComplete="current-password"
            onChange={handleChange}
            value={values.password}
            helperText={touched.password ? errors.password : ""}
            error={touched.password && Boolean(errors.password)}
            required
          />
        </FormControl>
        {/* <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        /> */}
        <ButtonWrapper>
          <Button
            type="submit"
            size="medium"
            fullWidth
            variant="contained"
            color="primary"
            disabled={isSubmitting}
            endIcon={isSubmitting ? <CircularProgress size={16} /> : undefined}
          >
            로그인
          </Button>
        </ButtonWrapper>
        {/* <Button
          component={Link}
          to="/auth/reset-password"
          fullWidth
          color="primary"
        >
          비밀번호 찾기
        </Button> */}
      </form>
    </Wrapper>
  );
}

export default SignIn;
