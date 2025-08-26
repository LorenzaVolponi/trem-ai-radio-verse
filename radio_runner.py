"""Entrypoint script to start the Rádio Trem AI streaming loop."""
import asyncio

from backend.stream import build_scheduler_from_env, radio_loop_async


def main() -> None:
    """Build scheduler from environment and start the radio loop."""
    scheduler = build_scheduler_from_env()
    asyncio.run(radio_loop_async(scheduler))


if __name__ == "__main__":
    main()
