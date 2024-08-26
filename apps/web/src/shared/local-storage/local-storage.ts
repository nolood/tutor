export class LocalStorage {

	public setValue(value: string, key: string) {
		localStorage.setItem(key, value)
	}
	public getValue(key: string) {
		return localStorage.getItem(key);
	}
	public deleteValue(key: string) {
		localStorage.removeItem(key);
	}
}