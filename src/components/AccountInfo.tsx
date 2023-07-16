import { Alert, Box, Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FilledInput, FormControl, FormControlLabel, Grid, InputAdornment, InputLabel, MenuItem, Select, Snackbar, Switch, TextField, ThemeProvider, Typography, createTheme } from "@mui/material"
import UserDataType from "../model/UserDataType"
import UserType from "../model/UserType"
import { useSelectorUsers } from "../hooks/hooks"
import { useSelectorAuth } from "../redux/store"
import { useEffect, useRef, useState } from "react"
import InputResultType from "../model/InputResultType"
import UserCredentialsDataType from "../model/UserCredentialsDataType"
import StatusType from "../model/StatusType"
import { OrderStatusTypeArray } from "../model/OrderStatusType"

const defaultTheme = createTheme();

type Props = {
    submitFn: (userData: UserType, uid: string) => Promise<InputResultType>
}

const AccountInfo: React.FC<Props> = ({ submitFn }) => {

    const users = useSelectorUsers()
    const userData = useSelectorAuth();
    const [currentUser, setCurrentuser] = useState<UserType | undefined>(users.find(user => user.email == userData?.email))

    useEffect(() => {
        setCurrentuser(users.find(user => user.email == userData?.email))
    }, [userData, users])

    const message = useRef<string>('');
    const [open, setOpen] = useState(false);
    const severity = useRef<StatusType>('success');
    const [editMode, setEditMode] = useState<boolean>(false)
    const [city, setCity] = useState<string>(currentUser?.address.city || '')
    const [street, setStreet] = useState<string>(currentUser?.address.street || '')
    const [streetNumber, setStreetNumber] = useState<number>(currentUser?.address.streetNumber || 0)
    const [flatNumber, setFlatNumber] = useState<number>(currentUser?.address.flatNumber || 0)
    const [updateDialogOpened, setUpdateDialogOpened] = useState<boolean>(false)

    useEffect(() => {
        setCity(currentUser?.address.city || '')
        setStreet(currentUser?.address.street || '')
        setStreetNumber(currentUser?.address.streetNumber || 0)
        setFlatNumber(currentUser?.address.flatNumber || 0)
    }, [currentUser])

    const changeEditMode = () => {
        setEditMode(!editMode)
    }

    const cityChange = (event: any) => {
        setCity(event.target.value)
    }

    const streetChange = (event: any) => {
        setStreet(event.target.value)
    }

    const streetNumberChange = (event: any) => {
        setStreetNumber(event.target.value)
    }

    const flatNumberChange = (event: any) => {
        setFlatNumber(event.target.value)
    }

    const closeUpdateDialog = () => {
        setUpdateDialogOpened(false)
    }

    const openUpdateDialog = (event: any) => {
        event.preventDefault();
        setUpdateDialogOpened(true)
    }

    const handleSubmit = async (event: any) => {
        //     event.preventDefault();

        //     const data = new FormData(event.currentTarget);
        //     let firstName: string = data.get('fname')! as string;
        //     let lastName: string = data.get('lname')! as string;
        //     let email: string = data.get('email')! as string;
        //     let nickname: string = data.get('nickname')! as string;
        //     let city: string = data.get('city')! as string;
        //     let street: string = data.get('street')! as string;
        //     let streetNumber: number = +(data.get('streetNumber')! as string);
        //     let flatNumber: number = +(data.get('flatNumber')! as string);

        const result = await submitFn({ ...currentUser!, address: { city, street, flatNumber, streetNumber } }, userData!.uid);

        message.current = result.message!;
        severity.current = result.status;
        message.current && setOpen(true);
        closeUpdateDialog()
    };

    const props = {
        style: {
            padding: 5
        }
    }

    return <ThemeProvider theme={defaultTheme}>
        <Container component="main">
            <Box
                sx={{
                    alignItems: 'center',
                }}
            >
                <Grid container spacing={2} sx={{ flexGrow: 1 }}>
                    <Grid container xs={8}>
                        <Box component="span" sx={{ p: 2, border: '1px dashed grey' }}>
                            <Grid item xs={6} sm={6} md={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="fname"
                                    label="First Name"
                                    name="fname"
                                    value={currentUser?.firstName}
                                />
                            </Grid>
                        </Box>
                    </Grid>
                    <Grid container xs={4}>
                        <Box component="form" onSubmit={openUpdateDialog} sx={{ mt: 1, p: 2, border: '1px solid grey', borderRadius: '5vh' }}>
                            <FormControlLabel
                                control={
                                    <Switch checked={editMode} onChange={changeEditMode} name="gilad" />
                                }
                                label="Enable editing"
                            />
                            <Grid container justifyContent={'center'} spacing={1}>
                                <Grid container item xs={12} sm={12} md={12}>
                                    <Grid item xs={5} sm={5} md={5}>
                                        <TextField
                                            aria-readonly
                                            fullWidth
                                            variant="filled"
                                            value='First Name'
                                            inputProps={props}
                                        />
                                    </Grid>
                                    <Grid item xs={7} sm={7} md={7}>
                                        <TextField
                                            required
                                            fullWidth
                                            id="fname"
                                            name="fname"
                                            variant="filled"
                                            value={currentUser?.firstName}
                                            inputProps={props}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container item xs={12} sm={12} md={12}>
                                    <Grid item xs={5} sm={5} md={5}>
                                        <TextField
                                            aria-readonly
                                            fullWidth
                                            variant="filled"
                                            value='Last Name'
                                            inputProps={props}
                                        />
                                    </Grid>
                                    <Grid item xs={7} sm={7} md={7}>
                                        <TextField
                                            required
                                            fullWidth
                                            id="lname"
                                            name="lname"
                                            variant="filled"
                                            value={currentUser?.lastName}
                                            inputProps={props}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container item xs={12} sm={12} md={12}>
                                    <Grid item xs={5} sm={5} md={5}>
                                        <TextField
                                            aria-readonly
                                            fullWidth
                                            variant="filled"
                                            value='Email'
                                            inputProps={props}
                                        />
                                    </Grid>
                                    <Grid item xs={7} sm={7} md={7}>
                                        <TextField
                                            required
                                            fullWidth
                                            id="email"
                                            name="email"
                                            autoComplete="email"
                                            variant="filled"
                                            value={currentUser?.email}
                                            inputProps={props}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container item xs={12} sm={12} md={12}>
                                    <Grid item xs={5} sm={5} md={5}>
                                        <TextField
                                            aria-readonly
                                            fullWidth
                                            variant="filled"
                                            value='Nickname'
                                            inputProps={props}
                                        />
                                    </Grid>
                                    <Grid item xs={7} sm={7} md={7}>
                                        <TextField
                                            required
                                            fullWidth
                                            name="nickname"
                                            id="nickname"
                                            variant="filled"
                                            value={currentUser?.nickname}
                                            inputProps={props}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container item xs={12} sm={12} md={12}>
                                    <Grid item xs={5} sm={5} md={5}>
                                        <TextField
                                            aria-readonly
                                            fullWidth
                                            variant="filled"
                                            value='City'
                                            inputProps={props}
                                        />
                                    </Grid>
                                    <Grid item xs={7} sm={7} md={7}>
                                        <TextField
                                            required
                                            fullWidth
                                            name="city"
                                            id="city"
                                            variant="filled"
                                            value={city}
                                            onChange={cityChange}
                                            inputProps={props}
                                            disabled={!editMode}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container item xs={12} sm={12} md={12}>
                                    <Grid item xs={5} sm={5} md={5}>
                                        <TextField
                                            aria-readonly
                                            fullWidth
                                            variant="filled"
                                            value='Street'
                                            inputProps={props}
                                        />
                                    </Grid>
                                    <Grid item xs={7} sm={7} md={7}>
                                        <TextField
                                            required
                                            fullWidth
                                            name="street"
                                            id="street"
                                            variant="filled"
                                            value={street}
                                            onChange={streetChange}
                                            inputProps={props}
                                            disabled={!editMode}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container item xs={6} sm={6} md={6}>
                                    <Grid item xs={5} sm={5} md={5}>
                                        <TextField
                                            aria-readonly
                                            fullWidth
                                            variant="filled"
                                            value='St№'
                                            inputProps={props}
                                        />
                                    </Grid>
                                    <Grid item xs={7} sm={7} md={7}>
                                        <TextField
                                            required
                                            fullWidth
                                            type="number"
                                            name="streetNumber"
                                            id="streetNumber"
                                            variant="filled"
                                            value={streetNumber}
                                            onChange={streetNumberChange}
                                            inputProps={props}
                                            disabled={!editMode}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container item xs={6} sm={6} md={6}>
                                    <Grid item xs={5} sm={5} md={5}>
                                        <TextField
                                            aria-readonly
                                            fullWidth
                                            variant="filled"
                                            value='Fl№'
                                            inputProps={props}
                                        />
                                    </Grid>
                                    <Grid item xs={7} sm={7} md={7}>
                                        <TextField
                                            required
                                            fullWidth
                                            type="number"
                                            name="flatNumber"
                                            id="flatNumber"
                                            variant="filled"
                                            value={flatNumber}
                                            onChange={flatNumberChange}
                                            inputProps={props}
                                            disabled={!editMode}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} sm={12} md={12}>
                                    {editMode && <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                    >
                                        Submit change
                                    </Button>}
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Container>
        <Snackbar open={open} autoHideDuration={10000}
            onClose={() => setOpen(false)}>
            <Alert onClose={() => setOpen(false)} severity={severity.current} sx={{ width: '100%' }}>
                {message.current}
            </Alert>
        </Snackbar>
        <Dialog open={updateDialogOpened} onClose={closeUpdateDialog} fullWidth maxWidth={"xs"}>
            <DialogTitle>Address update</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you want to update your address?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={closeUpdateDialog}>
                    Close
                </Button>
                <Button onClick={handleSubmit} autoFocus>
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    </ThemeProvider>
}

export default AccountInfo