"use client";
import { getUser } from "@/lib/dal";
import { initialUser } from "@/utils/data/register.data";
import {
	createContext,
	useContext,
	useEffect,
	useState,
	useMemo,
	useCallback,
} from "react";
import { CoachRoleType } from "type/coachRole";
import { UserType } from "type/user";
import { UserDetailsType } from "type/userDetails";
import axios from "axios";

interface AuthContextProps {
	isAuth: boolean;
	setIsAuth: (isAuth: boolean) => void;
	user: UserType | null;
	setUser: (user: UserType | null) => void;
	userDetails: UserDetailsType | null;
	setUserDetails: (userDetails: UserDetailsType) => void;
	loading: boolean;
	coachRoleData: CoachRoleType | null;
	setCoachRoleData: (coachRole: CoachRoleType | null) => void;
	loadingCoachData: boolean;
	setLoadingCoachData: (loading: boolean) => void;
}

export const AuthContext = createContext<AuthContextProps>({
	isAuth: false,
	setIsAuth: () => {},
	user: initialUser,
	setUser: () => {},
	userDetails: null,
	setUserDetails: () => {},
	loading: false,
	coachRoleData: null,
	setCoachRoleData: () => {},
	loadingCoachData: false,
	setLoadingCoachData: () => {},
});

const url = process.env.NEXT_PUBLIC_API_URL;

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [isAuth, setIsAuth] = useState<boolean>(false);
	const [user, setUser] = useState<UserType | null>(initialUser);
	const [userDetails, setUserDetails] = useState<UserDetailsType | null>(
		null,
	);
	const [coachRoleData, setCoachRoleData] = useState<CoachRoleType | null>(
		null,
	);
	const [loading, setLoading] = useState<boolean>(true);
	const [loadingCoachData, setLoadingCoachData] = useState<boolean>(true);

	// Récupération des données de l'utilisateur
	useEffect(() => {
		const fetchUser = async () => {
			try {
				const data = await getUser();
				setUser(data);
				setIsAuth(true);
			} catch (error) {
				console.error("Failed to fetch user:", error);
				setIsAuth(false);
			} finally {
				setLoading(false);
			}
		};

		fetchUser();
	}, []);

	// Récupération des détails de l'utilisateur
	useEffect(() => {
		const fetchUserDetail = async () => {
			try {
				if (!user) return;

				const response = await axios.get(
					`${url}/userdetails/user/${user.id}`,
				);
				setUserDetails(response.data);
			} catch (error) {
				console.error("Failed to fetch user details:", error);
			}
		};
		fetchUserDetail();
	}, [user]);

	// Récupération des infos du coach
	useEffect(() => {
		const fetchCoachRole = async () => {
			try {
				if (!user || !user.id || user.role.name !== "coach") return;

				const response = await axios.get(
					`${url}/coaches/user/${user.id}`,
				);
				if (!response.data) return;

				setCoachRoleData(response.data);
				setLoadingCoachData(false);
			} catch (error) {
				console.error("Failed to fetch coach role:", error);
			}
		};
		fetchCoachRole();
	}, [user]);

	const setIsAuthCallback = useCallback(
		(auth: boolean) => setIsAuth(auth),
		[],
	);
	const setUserCallback = useCallback(
		(user: UserType | null) => setUser(user),
		[],
	);
	const setUserDetailsCallback = useCallback(
		(details: UserDetailsType) => setUserDetails(details),
		[],
	);

	const setCoachRoleDataCallback = useCallback(
		(coachRole: CoachRoleType | null) => setCoachRoleData(coachRole),
		[],
	);

	console.log("userDetails", userDetails);

	const contextValue = useMemo(
		() => ({
			isAuth,
			setIsAuth: setIsAuthCallback,
			user,
			setUser: setUserCallback,
			userDetails,
			setUserDetails: setUserDetailsCallback,
			loading,
			coachRoleData,
			setCoachRoleData: setCoachRoleDataCallback,
			loadingCoachData,
			setLoadingCoachData,
		}),
		[
			isAuth,
			user,
			userDetails,
			setIsAuthCallback,
			setUserCallback,
			setUserDetailsCallback,
			loading,
		],
	);

	return (
		<AuthContext.Provider value={contextValue}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error("useAuth must be used within a AuthProvider");
	}
	return context;
};
