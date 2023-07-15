import { Box, Button, Grid, TextField } from "@mui/material"
import UserDataType from "../model/UserDataType"
import UserType from "../model/UserType"
import { useSelectorUsers } from "../hooks/hooks"
import { useSelectorAuth } from "../redux/store"
import { useEffect, useState } from "react"

const AccountInfo: React.FC = () => {

    const users = useSelectorUsers()
    const userData = useSelectorAuth();
    const [currentUser, setCurrentuser] = useState<UserType | undefined>(users.find(user => user.email == userData?.email))

    useEffect(() => {
        setCurrentuser(users.find(user => user.email == userData?.email))
    }, [userData, users])

    return <Box component="form" sx={{ mt: 1 }}>
        <Grid container justifyContent={'center'} spacing={1}>
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
            <Grid item xs={6} sm={6} md={6}>
                <TextField
                    required
                    fullWidth
                    id="lname"
                    label="Last Name"
                    name="lname"
                    value={currentUser?.lastName}
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
                    value={currentUser?.email}
                />
            </Grid>
            <Grid item xs={6} sm={6} md={6}>
                <TextField
                    required
                    fullWidth
                    name="nickname"
                    label="Nickname"
                    id="nickname"
                    value={currentUser?.nickname}
                />
            </Grid>
            <Grid item xs={12} sm={6} md={12}>
                <TextField
                    fullWidth
                    name="city"
                    label="City"
                    id="city"
                    value={currentUser?.address.city}
                />
            </Grid>
            <Grid item xs={8} sm={8} md={8}>
                <TextField
                    fullWidth
                    name="street"
                    label="Street"
                    id="street"
                    value={currentUser?.address.street}
                />
            </Grid>
            <Grid item xs={2} sm={2} md={2}>
                <TextField
                    fullWidth
                    name="streetNumber"
                    label="St№"
                    id="streetNumber"
                    value={currentUser?.address.streetNumber}
                />
            </Grid>
            <Grid item xs={2} sm={2} md={2}>
                <TextField
                    fullWidth
                    type='number'
                    name="flatNumber"
                    label="Fl№"
                    id="flatNumber"
                    value={currentUser?.address.flatNumber}
                />
            </Grid>
            <Grid item xs={12} sm={6} md={12}>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                >
                    Submit change
                </Button>
            </Grid>
        </Grid>
    </Box>
}

export default AccountInfo