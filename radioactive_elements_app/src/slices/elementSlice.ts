import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { api } from "../api/index"
import { useSelector } from "react-redux"
import { RootState } from "../store";
import mockElements from '../modules/Mock'

interface elementState {
    element: {
        element_id?: number,
        name: string,
        description: string,
        status: "active" | "deleted",
        img_url?: string | null,
        period_time_text: string,
        period_time: number,
        atomic_mass: number
    },
    loading: boolean
}

const initialState: elementState = {
    element: {
        element_id: 0,
        name: '',
        description: '',
        status: 'deleted',
        img_url: '',
        period_time_text: '',
        period_time: 0,
        atomic_mass: 0
    },
    loading: false
}

export const getElementWithId = createAsyncThunk(
    'element/getElementWithId',
    async (elementId: string, { dispatch, rejectWithValue }) => {
        try {
            const response = await api.elements.elementsRead(elementId)
            return response.data
        } catch (error: any) {
            const element = mockElements.elements.find((el) => el.element_id.toString() === elementId)
            dispatch(setElementContentAction(element))
            return rejectWithValue("Произошла ошибка")
        }
    }
)

export const editElement = createAsyncThunk(
    'element/editElement',
    async (elementId: string, {getState, rejectWithValue}) => {
        const state = getState() as RootState
        try {
            const response = await api.elements.elementsUpdate(elementId, state.element.element)
            return response.data
        } catch (error: any) {
            return rejectWithValue("Произошла ошибка")
        }
    }
)

export const saveElementImage = createAsyncThunk(
    'element/saveElementImage',
    async (credentials: {elementId: string, file: File}, {rejectWithValue}) => {
        try {
            const response = await api.elements.elementsAddImgCreate(credentials.elementId, {'img': credentials.file})
            return response.data
        } catch (error: any) {
            return rejectWithValue("Произошла ошибка")
        }
    }
)

export const deleteElement = createAsyncThunk(
    'element/deleteElement',
    async (elementId: string, {rejectWithValue}) => {
        try {
            const response = await api.elements.elementsDelete(elementId)
            return response.data
        } catch (error: any) {
            return rejectWithValue("Произошла ошибка")
        }
    }
)

export const createElement = createAsyncThunk(
    'element/createElement',
    async (_, {getState, rejectWithValue}) => {
        const state = getState() as RootState
        try {
            const response = await api.elements.elementsCreate(state.element.element)
            return response.data
        } catch (error: any) {
            return rejectWithValue("Произошла ошибка")
        }
    }
)

const elementSlice = createSlice({
    name: 'element',
    initialState,
    reducers: {
        setElementContent(state, {payload}) {
            state.element = payload
        },
        setElementInitialState(state) {
            state.element = initialState.element
        },
        setElementName(state, {payload}) {
            state.element.name = payload
        },
        setElementDescription(state, {payload}) {
            state.element.description = payload
        },
        setElementStatus(state, {payload}) {
            state.element.status = payload
        },
        setElementPeriodTimeText(state, {payload}) {
            state.element.period_time_text = payload
        },
        setElementPeriodTime(state, {payload}) {
            state.element.period_time = payload
        },
        setElementAtomicMass(state, {payload}) {
            state.element.atomic_mass = payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getElementWithId.pending, (state) => {
            state.loading = true
        }),
        builder.addCase(getElementWithId.fulfilled, (state, {payload}) => {
            state.loading = false
            state.element = payload!
        }),
        builder.addCase(getElementWithId.rejected, (state) => {
            state.loading = false
        })
    }
})

export const useElement = () => useSelector((state: RootState) => state.element.element)
export const useElementLoading = () => useSelector((state: RootState) => state.element.loading)

export const {
    setElementContent: setElementContentAction,
    setElementInitialState: setElementInitialStateAction,
    setElementName: setElementNameAction,
    setElementDescription: setElementDescriptionAction,
    setElementStatus: setElementStatusAction,
    setElementPeriodTimeText: setElementPeriodTimeTextAction,
    setElementPeriodTime: setElementPeriodTimeAction,
    setElementAtomicMass: setElementAtomicMassAction
} = elementSlice.actions

export default elementSlice.reducer