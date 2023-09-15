import { getDataProfile } from "../fun/get-profile";


/**
 * @function load data user dan profile
 * @param id user
 * @param setUser 
 * @param setProfile 
 * @returns data user dan data profile
 */
export async function loadDataProfile(id: any,  setUser: any, setProfile: any) {
  const data = await getDataProfile(id).then((res) => {
    setUser(res.dataUser);
    setProfile(res.dataProfile);
  });
}
