const BASE_URL = "http://localhost:5000";

interface getProps {
  name: string;
  option?: string;
}
export async function getInfo({ name, option }: getProps) {
  try {
    if (!option) option = "";
    console.log(`${BASE_URL}/${name}/${option}`);
    const { data } = await (await fetch(`${BASE_URL}/${name}/${option}`)).json();
    return data;
  } catch (err) {
    console.log(err);
  }
}
