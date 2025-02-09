import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { api } from "../api";

interface decayInf {
    decay_id: number,
    decay_elements_count: number
}

interface userState {
    email: string;
    isAuthenticated: boolean;
    isModerator: boolean;
    loading: boolean, 
    decayInf: decayInf
}

const initialState: userState = {
    email: '',
    isAuthenticated: false,
    isModerator: false,
    loading: false,
    decayInf: {
        decay_id: 0,
        decay_elements_count: 0
    }
}

export const userLogin = createAsyncThunk(
    'user/userLogin',
    async (credentials: { email: string; password: string }, { rejectWithValue }) => {
        try {
            const response = await api.user.userLoginCreate(credentials);
            return response.data
        } catch (error: any) {
            return rejectWithValue("Произошла ошибка")
        }
    }
)

export const userLogout = createAsyncThunk(
    'user/userLogout',
    async(_, { rejectWithValue }) => {
        try {
            const response = await api.user.userLogoutCreate();
            return response.data
        } catch (error: any) {
            return rejectWithValue("Произошла ошибка")
        }
    }
)

export const userRegistration = createAsyncThunk(
    'user/userRegistration',
    async(credentials: { email: string, password: string }, { rejectWithValue }) => {
        try {
            const response = await api.user.userRegistrationCreate(credentials);
            return response.data
        } catch (error: any) {
            return rejectWithValue("Произошла ошибка")
        }
    }
)

export const userAccount = createAsyncThunk(
    'user/userAccount',
    async(credentials: { email:string, password: string }, { rejectWithValue }) => {
        try {
            const response = await api.user.userAccountUpdate(credentials);
            return response.data
        } catch (error: any) {
            return rejectWithValue("Произошла ошибка")
        }
    }
)

const userSlice = createSlice ({
    name: 'user',
    initialState,
    reducers: {
        setDecayInf(state, {payload}) {
            state.decayInf = payload
        },
        setDecayCountZero(state) {
            state.decayInf.decay_elements_count = 0
        }
    },
    extraReducers: (builder) => {
        builder.addCase(userLogin.pending, (state) => {
            state.loading = true
        }),
        builder.addCase(userLogin.fulfilled, (state, {payload}) => {
            state.email = payload.email;
            state.isAuthenticated = true;
            state.isModerator = payload.is_staff!;
            state.loading = false;
        }),
        builder.addCase(userLogin.rejected, (state) => {
            state.loading = false;
        }),
        builder.addCase(userLogout.pending, (state) => {
            state.loading = true
        }),
        builder.addCase(userLogout.fulfilled, (state) => {
            state.email = ''
            state.isAuthenticated = false
            state.isModerator = false
            state.loading = false
        }),
        builder.addCase(userLogout.rejected, (state) => {
            state.loading = false
        }),
        builder.addCase(userRegistration.pending, (state) => {
            state.loading = true
        }),
        builder.addCase(userRegistration.fulfilled, (state, {payload}) => {
            state.email = payload.email
            state.isAuthenticated = true
            state.isModerator = payload.is_staff!
            state.loading = false
        }),
        builder.addCase(userRegistration.rejected, (state) => {
            state.loading = false
        }),
        builder.addCase(userAccount.pending, (state) => {
            state.loading = true
        }),
        builder.addCase(userAccount.fulfilled, (state, {payload}) => {
            state.email = payload.email
            state.loading = false
        }),
        builder.addCase(userAccount.rejected, (state) => {
            state.loading = false
        })
    }
})

export const useEmail = () => useSelector((state: RootState) => state.user.email)
export const useIsAuthenticated = () => useSelector((state: RootState) => state.user.isAuthenticated)
export const useIsModerator = () => useSelector((state: RootState) => state.user.isModerator)
export const useUserLoading = () => useSelector((state: RootState) => state.user.loading)
export const useDecayInf = () => useSelector((state: RootState) => state.user.decayInf)

export const {
    setDecayInf: setDecayInfAction,
    setDecayCountZero: setDecayCountZeroAction,
} = userSlice.actions

export default userSlice.reducer