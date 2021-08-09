interface AnyObj {
    [key: string]: any;
}
export default function jsonpAdapter(config: AnyObj): Promise<unknown>;
export {};
