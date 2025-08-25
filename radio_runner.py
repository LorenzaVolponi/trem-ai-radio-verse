"""Entrypoint script to start the Rádio Trem AI streaming loop."""
from backend.stream import build_scheduler_from_env, radio_loop


def main() -> None:
    """Build scheduler from environment and start the radio loop."""
    scheduler = build_scheduler_from_env()
    radio_loop(scheduler)


if __name__ == "__main__":
    main()
