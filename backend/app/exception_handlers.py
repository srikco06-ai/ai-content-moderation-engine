from fastapi import FastAPI, HTTPException, Request
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse

from app.logging_config import get_logger

logger = get_logger(__name__)


def _serialize_validation_errors(errors: list[dict]) -> list[dict]:
    """
    Convert validation errors into JSON-serializable objects.
    """

    serialized = []

    for error in errors:
        error = error.copy()

        if "ctx" in error:
            error["ctx"] = {key: str(value) for key, value in error["ctx"].items()}

        serialized.append(error)

    return serialized


def register_exception_handlers(app: FastAPI) -> None:
    """
    Register global exception handlers.
    """

    @app.exception_handler(RequestValidationError)
    async def validation_exception_handler(
        request: Request,
        exc: RequestValidationError,
    ):
        logger.warning(
            "Validation error | path=%s method=%s",
            request.url.path,
            request.method,
        )

        return JSONResponse(
            status_code=422,
            content={
                "detail": _serialize_validation_errors(exc.errors()),
            },
        )

    @app.exception_handler(HTTPException)
    async def http_exception_handler(
        request: Request,
        exc: HTTPException,
    ):
        logger.warning(
            "HTTP exception | status=%d path=%s",
            exc.status_code,
            request.url.path,
        )

        return JSONResponse(
            status_code=exc.status_code,
            content={
                "detail": exc.detail,
            },
        )

    @app.exception_handler(Exception)
    async def generic_exception_handler(
        request: Request,
        exc: Exception,
    ):
        logger.exception(
            "Unhandled exception | path=%s method=%s",
            request.url.path,
            request.method,
        )

        return JSONResponse(
            status_code=500,
            content={"detail": ("An unexpected internal server error occurred.")},
        )
