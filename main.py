#!/usr/bin/env python3
"""
Reddit Saved Posts Organizer - Main entry point
Organizes your saved Reddit posts and comments into a structured second brain.
"""

import sys
from rich.console import Console
from rich.panel import Panel
from rich import box

from reddit_organizer.config import Config
from reddit_organizer.reddit_client import RedditClient
from reddit_organizer.organizer import SecondBrainOrganizer

console = Console()


def print_banner():
    """Print application banner."""
    banner = """
[bold cyan]Reddit Saved Posts Organizer[/bold cyan]
[dim]Transform your saved Reddit content into a structured second brain[/dim]
    """
    console.print(Panel(banner, box=box.DOUBLE, border_style="cyan"))


def main():
    """Main application entry point."""
    print_banner()

    try:
        # Step 1: Load or prompt for credentials
        config = Config()
        username, password, client_id, client_secret = config.load_or_prompt_credentials()

        # Step 2: Authenticate with Reddit
        console.print("\n[bold blue]Authenticating with Reddit...[/bold blue]")
        reddit_client = RedditClient(username, password, client_id, client_secret)

        # Step 3: Fetch saved content
        console.print("\n[bold blue]Fetching your saved content...[/bold blue]")
        saved_posts = reddit_client.fetch_saved_posts()
        saved_comments = reddit_client.fetch_saved_comments()

        if not saved_posts and not saved_comments:
            console.print("\n[yellow]No saved posts or comments found![/yellow]")
            return

        # Step 4: Organize content into second brain
        console.print("\n[bold blue]Organizing your second brain...[/bold blue]")
        organizer = SecondBrainOrganizer(output_dir="output")

        if saved_posts:
            organizer.organize_posts(saved_posts)

        if saved_comments:
            organizer.organize_comments(saved_comments)

        organizer.create_main_index()

        # Step 5: Success message
        console.print("\n" + "="*60)
        console.print(Panel(
            "[bold green]✓ Success![/bold green]\n\n"
            f"Your saved content has been organized into the 'output' directory.\n\n"
            f"[cyan]Posts:[/cyan] {len(saved_posts)}\n"
            f"[cyan]Comments:[/cyan] {len(saved_comments)}\n\n"
            "Check [bold]output/README.md[/bold] to start exploring!",
            box=box.ROUNDED,
            border_style="green"
        ))

    except KeyboardInterrupt:
        console.print("\n\n[yellow]Operation cancelled by user[/yellow]")
        sys.exit(0)
    except Exception as e:
        console.print(f"\n[bold red]Error:[/bold red] {str(e)}")
        sys.exit(1)


if __name__ == "__main__":
    main()
