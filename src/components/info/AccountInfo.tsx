import { Alert, Box, Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FilledInput, FormControl, FormControlLabel, Grid, InputAdornment, InputLabel, MenuItem, Select, Snackbar, Switch, TextField, ThemeProvider, Typography, createTheme } from "@mui/material"
import UserType from "../../model/UserType"
import { useSelectorUsers } from "../../hooks/hooks"
import { useSelectorAuth } from "../../redux/store"
import { useEffect, useState } from "react"

const defaultTheme = createTheme();

type Props = {
    submitFn: (userData: UserType, uid: string) => Promise<void>
}

const AccountInfo: React.FC<Props> = ({ submitFn }) => {

    const users = useSelectorUsers()
    const userData = useSelectorAuth();
    const [currentUser, setCurrentuser] = useState<UserType | undefined>(users.find(user => user.email == userData?.email))

    useEffect(() => {
        setCurrentuser(users.find(user => user.email == userData?.email))
    }, [userData, users])

    const [editMode, setEditMode] = useState<boolean>(false)
    const [firstName, setFirstName] = useState<string>(currentUser?.firstName || '')
    const [lastName, setLastName] = useState<string>(currentUser?.lastName || '')
    const [email, setEmail] = useState<string>(currentUser?.email || '')
    const [nickname, setNickname] = useState<string>(currentUser?.nickname || '')
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

    const firstNameChange = (event: any) => {
        setFirstName(event.target.value)
    }

    const lastNameChange = (event: any) => {
        setLastName(event.target.value)
    }

    const nicknameChange = (event: any) => {
        setNickname(event.target.value)
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
        await submitFn({ email: currentUser!.email, firstName, lastName, nickname, address: { city, street, flatNumber, streetNumber } }, userData!.uid);
        closeUpdateDialog()
    };

    return <ThemeProvider theme={defaultTheme}>
        <Container component="main">
            <Box component="form" onSubmit={openUpdateDialog} sx={{ mt: 1, p: 2 }}>
                <FormControlLabel
                    control={
                        <Switch checked={editMode} onChange={changeEditMode} name="gilad" />
                    }
                    label="Enable editing"
                />
                <Grid container spacing={2} sx={{ flexGrow: 1 }} xs={12}>
                    <Grid item xs={12}>
                        <InputLabel shrink>
                            First name
                        </InputLabel>
                        <TextField
                            required
                            fullWidth
                            id="fname"
                            name="fname"
                            variant="filled"
                            value={currentUser?.firstName || firstName}
                            onChange={firstNameChange}
                            disabled={Boolean(currentUser?.firstName) || !editMode}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <InputLabel shrink>
                            Last name
                        </InputLabel>
                        <TextField
                            required
                            fullWidth
                            id="lname"
                            name="lname"
                            variant="filled"
                            value={currentUser?.lastName || lastName}
                            onChange={lastNameChange}
                            disabled={Boolean(currentUser?.lastName) || !editMode}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <InputLabel shrink>
                            Email
                        </InputLabel>
                        <TextField
                            required
                            fullWidth
                            id="email"
                            name="email"
                            autoComplete="email"
                            variant="filled"
                            value={currentUser?.email}
                            disabled={Boolean(currentUser?.email) || !editMode}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <InputLabel shrink>
                            Nickname
                        </InputLabel>
                        <TextField
                            required
                            fullWidth
                            name="nickname"
                            id="nickname"
                            variant="filled"
                            value={currentUser?.nickname || nickname}
                            onChange={nicknameChange}
                            disabled={Boolean(currentUser?.nickname) || !editMode}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <InputLabel shrink>
                            City
                        </InputLabel>
                        <TextField
                            required
                            fullWidth
                            name="city"
                            id="city"
                            variant="filled"
                            value={city}
                            onChange={cityChange}
                            disabled={!editMode}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <InputLabel shrink>
                            Street
                        </InputLabel>
                        <TextField
                            required
                            fullWidth
                            name="street"
                            id="street"
                            variant="filled"
                            value={street}
                            onChange={streetChange}
                            disabled={!editMode}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <InputLabel shrink>
                            Street number
                        </InputLabel>
                        <TextField
                            required
                            fullWidth
                            type="number"
                            name="streetNumber"
                            id="streetNumber"
                            variant="filled"
                            value={streetNumber}
                            onChange={streetNumberChange}
                            disabled={!editMode}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <InputLabel shrink>
                            Flat number
                        </InputLabel>
                        <TextField
                            required
                            fullWidth
                            type="number"
                            name="flatNumber"
                            id="flatNumber"
                            variant="filled"
                            value={flatNumber}
                            onChange={flatNumberChange}
                            disabled={!editMode}
                        />
                    </Grid>
                    <Grid item xs={4}>
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
        </Container>
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
    </ThemeProvider >
}

export default AccountInfo