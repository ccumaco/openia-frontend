import { defineStore } from "pinia";
import {
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    sendEmailVerification,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore/lite";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { auth, db, storage } from "../../firebaseConfig";
import router from "../router";
import { useDatabaseStore } from "./database";
import { User, UserInterface } from "./interfases";

export const useUserStore = defineStore("userStore", {
    state: () => ({
        userData: null as UserInterface,
        loadingUser: false,
        loadingSession: false,
    }),
    actions: {
        async registerUser(email: string, password: string) {
            this.loadingUser = true;
            try {
                await createUserWithEmailAndPassword(auth, email, password);
                // this.userData = { email: user.email, uid: user.uid };
                await sendEmailVerification(auth?.currentUser!);
                router.push("/login");
            } catch (error: any) {
                console.log(error.code);
                return error.code;
            } finally {
                this.loadingUser = false;
            }
        },
        async updateUser(displayName: string, imagen: any) {
            this.loadingUser = true;
            try {
                if (imagen) {
                    const storageRef = ref(
                        storage,
                        `perfiles/${this.userData?.uid}`
                    );
                    await uploadBytes(storageRef, imagen.originFileObj);
                    const photoURL = await getDownloadURL(storageRef);
                    await updateProfile(auth?.currentUser!, {
                        photoURL,
                    });
                }
                await updateProfile(auth?.currentUser!, {
                    displayName,
                });
                this.setUser(auth?.currentUser!);
            } catch (error: any) {
                console.log(error);
                return error.code;
            } finally {
                this.loadingUser = false;
            }
        },
        async setUser(user: User) {
            try {
                const docRef = doc(db, "users", user.uid);

                this.userData = {
                    email: user.email,
                    uid: user.uid,
                    displayName: user.displayName,
                    photoURL: user.photoURL,
                };

                await setDoc(docRef, this.userData);
            } catch (error) {
                console.log(error);
            }
        },
        async loginUser(email: string, password: string) {
            this.loadingUser = true;
            try {
                const { user } = await signInWithEmailAndPassword(
                    auth,
                    email,
                    password
                );
                await this.setUser(user);
                router.push("/products");
            } catch (error: any) {
                console.log(error.code);
                return error.code;
            } finally {
                this.loadingUser = false;
            }
        },
        async logoutUser() {
            const databaseStore = useDatabaseStore();
            databaseStore.$reset();
            this.userData = null;
            try {
                router.push("/login");
                await signOut(auth);
            } catch (error) {
                console.log(error);
            }
        },
        async loginWithGoogle() {
            this.loadingUser = true;
            try {
                const provider = new GoogleAuthProvider();
                const { user } = await signInWithPopup(auth, provider);
                await this.setUser(user);
                router.push("/products");
            } catch (error: any) {
                console.log(error.code);
                return error.code;
            } finally {
                this.loadingUser = false;
            }
        },
        async registerUserWithEmail(email: string, password: string) {
            this.loadingUser = true;
            try {
                const { user } = await createUserWithEmailAndPassword(auth, email, password);
                await sendEmailVerification(auth.currentUser!);
                await this.setUser(user);
                router.push("/login");
            } catch (error: any) {
                console.log(error.code);
                return error.code;
            } finally {
                this.loadingUser = false;
            }
        },
        async resetPassword(email: string) {
            this.loadingUser = true;
            try {
              await sendPasswordResetEmail(auth, email);
              // Aquí puedes mostrar un mensaje al usuario indicando que se ha enviado un correo electrónico de restablecimiento de contraseña
              router.push("/login");
            } catch (error: any) {
              console.log(error.code);
              return error.code;
            } finally {
              this.loadingUser = false;
            }
        },
        currentUser() {
            return new Promise((resolve, reject) => {
                const unsuscribe = onAuthStateChanged(
                    auth,
                    async (user: any) => {
                        if (user) {
                            console.log(user);
                            // await this.setUser(user);
                            this.userData = {
                                email: user.email,
                                uid: user.uid,
                                displayName: user.displayName,
                                photoURL: user.photoURL,
                            };
                        } else {
                            // aqui debo definir esto como null despues
                            this.userData = null;
                            const databaseStore = useDatabaseStore();
                            databaseStore.$reset();
                        }
                        resolve(user);
                    },
                    (e) => reject(e)
                );
                unsuscribe();
            });
        },
    },
});
