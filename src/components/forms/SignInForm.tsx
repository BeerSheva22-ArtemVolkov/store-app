import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import UserCredentialsDataType from '../../model/UserCredentialsDataType';
import { Divider } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';

const SUBMIT_BUTTON_VALUE = 'Sign In'
const GOOGLE_SUBMIT_BUTTON_VALUE = 'Google Sign In'
const FACEBOOK_SUBMIT_BUTTON_VALUE = 'Facebook Sign In'

function Copyright(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://tel-ran.com/">
                Tel-Ran
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const defaultTheme = createTheme();

type Props = {
    submitFn: (loginData: UserCredentialsDataType) => Promise<void>
}

const SignInForm: React.FC<Props> = ({ submitFn }) => {

    const handleSubmit = async (event: any) => {
        event.preventDefault();

        const data = new FormData(event.currentTarget);
        let email: string = ''
        let password: string = ''

        switch (event.nativeEvent.submitter.value) {
            case GOOGLE_SUBMIT_BUTTON_VALUE:
                email = "GOOGLE"
                break;
            case FACEBOOK_SUBMIT_BUTTON_VALUE:
                email = "FACEBOOK"
                break;
            case SUBMIT_BUTTON_VALUE:
                email = data.get('email')! as string;
                password = data.get('password')! as string;
                break
        }

        await submitFn({ email, password });
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: { xs: 1, sm: 1, md: 1 },
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <Grid container justifyContent={'center'} spacing={1}>
                            <Grid item xs={12} sm={12} md={12}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    value={SUBMIT_BUTTON_VALUE}
                                >
                                    Sign In
                                </Button>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                                <Divider sx={{ width: '100%', fontWeight: 'bold' }}>or</Divider>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="outlined"
                                    value={GOOGLE_SUBMIT_BUTTON_VALUE}
                                    startIcon={<GoogleIcon />}
                                >
                                    Sign In with Google
                                </Button>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="outlined"
                                    value={FACEBOOK_SUBMIT_BUTTON_VALUE}
                                    startIcon={<FacebookIcon />}
                                >
                                    Sign In with Facebook
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 4, mb: 4 }} />
            </Container>
        </ThemeProvider >
    );
}
export default SignInForm;