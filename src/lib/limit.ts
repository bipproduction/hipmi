import pLimit from "p-limit";

const global_limit = pLimit(1);

export default global_limit;