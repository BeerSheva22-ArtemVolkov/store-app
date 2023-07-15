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
import UserCredentialsDataType from '../model/UserCredentialsDataType';
import InputResultType from '../model/InputResultType';
import { Alert, Divider, Snackbar } from '@mui/material';
import StatusType from '../model/StatusType';
import UserType from '../model/UserType';

const defaultTheme = createTheme();

type Props = {
    submitFn: (loginData: UserCredentialsDataType, userData: UserType) => Promise<InputResultType>
}

const RegistrationForm: React.FC<Props> = ({ submitFn }) => {

    const message = React.useRef<string>('');
    const [open, setOpen] = React.useState(false);
    const severity = React.useRef<StatusType>('success');

    const handleSubmit = async (event: any) => {
        event.preventDefault();

        const data = new FormData(event.currentTarget);
        let firstName: string = data.get('fname')! as string;
        let lastName: string = data.get('lname')! as string;
        let email: string = data.get('email')! as string;
        let password: string = data.get('password')! as string;
        let nickname: string = data.get('nickname')! as string;
        let city: string = data.get('city')! as string;
        let street: string = data.get('street')! as string;
        let streetNumber: number = +(data.get('streetNumber')! as string);
        let flatNumber: number = +(data.get('flatNumber')! as string);

        console.log(email, firstName, lastName, nickname);
        

        const result = await submitFn({ email, password }, { email, firstName, lastName, nickname, address: { city, street, flatNumber, streetNumber } });
        console.log(result);

        message.current = result.message!;
        severity.current = result.status;
        message.current && setOpen(true);
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: { xs: 8, sm: -4, md: 8 },
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Registration
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <Grid container justifyContent={'center'} spacing={1}>
                            <Grid item xs={6} sm={6} md={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="fname"
                                    label="First Name"
                                    name="fname"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={6} sm={6} md={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="lname"
                                    label="Last Name"
                                    name="lname"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={6} sm={6} md={6}>
                                <TextField
                                    required
                                    fullWidth
                                    name="nickname"
                                    label="Nickname"
                                    id="nickname"
                                />
                            </Grid>
                            <Grid item xs={6} sm={6} md={6}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={12}>
                                <TextField
                                    fullWidth
                                    name="city"
                                    label="City"
                                    id="city"
                                />
                            </Grid>
                            <Grid item xs={8} sm={8} md={8}>
                                <TextField
                                    fullWidth
                                    name="street"
                                    label="Street"
                                    id="street"
                                />
                            </Grid>
                            <Grid item xs={2} sm={2} md={2}>
                                <TextField
                                    fullWidth
                                    name="streetNumber"
                                    label="St№"
                                    id="streetNumber"
                                />
                            </Grid>
                            <Grid item xs={2} sm={2} md={2}>
                                <TextField
                                    fullWidth
                                    type='number'
                                    name="flatNumber"
                                    label="Fl№"
                                    id="flatNumber"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={12}>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                >
                                    Registration
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                    <Snackbar open={open} autoHideDuration={10000}
                        onClose={() => setOpen(false)}>
                        <Alert onClose={() => setOpen(false)} severity={severity.current} sx={{ width: '100%' }}>
                            {message.current}
                        </Alert>
                    </Snackbar>
                </Box>
            </Container>
        </ThemeProvider >
    );
}
export default RegistrationForm