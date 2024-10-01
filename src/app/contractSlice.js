// contractSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ethers } from 'ethers';
import { getSignerContract } from "./script/ContractUtils";

let { AttendanceWithRewards_contract, signer } = getSignerContract();

// Async Thunk to handle setRewardRange function
export const setRewardRange = createAsyncThunk(
    'contract/setRewardRange',
    // async ({ checkType, rewardAmount, timeFrom, timeTo, rewardAction, checkStatus }, { rejectWithValue }) => {
    async ({ checkType, rewardAmount, timeFrom, timeTo, rewardAction, checkStatus }, { rejectWithValue }) => {
      console.log(checkType, rewardAmount, timeFrom, timeTo, rewardAction, checkStatus,"OOOOOOOO", ethers.utils.parseUnits(rewardAmount.toString(), 'ether'));

      try {
        const tx = await AttendanceWithRewards_contract.setRewardRange(
          checkType,
          rewardAmount,  // Convert to appropriate units
          timeFrom,
          timeTo,
          rewardAction,
          checkStatus
        );
        console.log("OOOOOOOO");
        
        await tx.wait();
        return tx;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
);

// Async Thunk to handle checkIn function
export const checkIn = createAsyncThunk(
  'contract/checkIn',
  async ({ day, time }, { rejectWithValue }) => {
    try {
      const tx = await AttendanceWithRewards_contract.checkIn(day, time);
      await tx.wait();  // Wait for transaction to be mined
      return tx;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async Thunk to handle checkOut function
export const checkOut = createAsyncThunk(
  'contract/checkOut',
  async ({ day, time }, { rejectWithValue }) => {
    try {
      const tx = await AttendanceWithRewards_contract.checkOut(day, time);
      await tx.wait();
      return tx;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async Thunk to handle recordLeave function
export const recordLeave = createAsyncThunk(
  'contract/recordLeave',
  async ({ day, leaveType }, { rejectWithValue }) => {
    try {
      const tx = await AttendanceWithRewards_contract.recordLeave(day, leaveType);
      await tx.wait();
      return tx;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async Thunk to get reward amount for a specific time
export const getRewardAmountTime = createAsyncThunk(
  'contract/getRewardAmountTime',
  async ({ time, checkType }, { rejectWithValue }) => {
    try {
      const rewardAmount = await AttendanceWithRewards_contract.getRewardAmountTime(time, checkType);
      return rewardAmount;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async Thunk to get attendance percentage
export const getAttendancePercentage = createAsyncThunk(
  'contract/getAttendancePercentage',
  async ({ user }, { rejectWithValue }) => {
    try {
      const percentage = await AttendanceWithRewards_contract.getAttendancePercentage(user);
      return percentage;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async Thunk to mark absence
export const markAbsence = createAsyncThunk(
  'contract/markAbsence',
  async ({ day, user }, { rejectWithValue }) => {
    try {
      const tx = await AttendanceWithRewards_contract.markAbsence(day, user);
      await tx.wait();
      return tx;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async Thunk to get user attendance details
export const getUserAttendance = createAsyncThunk(
  'contract/getUserAttendance',
  async ({ user, day }, { rejectWithValue }) => {
    try {
      const attendanceDetails = await AttendanceWithRewards_contract.getUserAttendance(user, day);
      return attendanceDetails;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Redux slice to handle contract states
const contractSlice = createSlice({
  name: 'contract',
  initialState: {
    transaction: null,
    isLoading: false,
    error: null,
    attendancePercentage: null,
    rewardAmount: null,
    userAttendance: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkIn.pending, (state) => { state.isLoading = true; })
      .addCase(checkIn.fulfilled, (state, action) => {
        state.isLoading = false;
        state.transaction = action.payload;
      })
      .addCase(checkIn.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(setRewardRange.pending, (state) => { state.isLoading = true; })
      .addCase(setRewardRange.fulfilled, (state, action) => {
        state.isLoading = false;
        state.transaction = action.payload;
      })
      .addCase(setRewardRange.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
      // Add similar cases for other actions...
  }
  
});

export const contractReducer = contractSlice.reducer; // Export the reducer
