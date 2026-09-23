import { ApiError } from "../errors/apiError";

export type Result<T,E = ApiError> = Success<T> | Failure<E>;
type Success<T> = {ok:true, value: T};
type Failure<E> = {ok: false, error: E};


export function isSuccess<T, E>(result: Result<T, E>):result is Success<T>{
  {
    return result.ok === true
  }
}

export function isFailure<T, E>(result: Result<T, E>):result is Failure<E>{
  {
    return result.ok === false
  }
}


