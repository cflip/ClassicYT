export default abstract class DataProvider<I, D> {
	abstract get(id: I): Promise<D>;
}
