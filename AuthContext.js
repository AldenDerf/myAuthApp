import React, { createContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { create } from 'react-test-renderer';

export const AuthContext = createContext();

export const AuthProvider = ({ })