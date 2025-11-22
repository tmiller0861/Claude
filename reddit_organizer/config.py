"""Configuration management for Reddit API credentials."""

import os
from pathlib import Path
from dotenv import load_dotenv
from rich.console import Console
from rich.prompt import Prompt, Confirm

console = Console()


class Config:
    """Manages configuration and credentials for the Reddit API."""

    def __init__(self):
        """Initialize configuration."""
        self.env_file = Path(".env")
        load_dotenv(self.env_file)

        self.client_id = None
        self.client_secret = None
        self.username = None
        self.password = None

    def load_or_prompt_credentials(self) -> tuple:
        """
        Load credentials from environment or prompt user for them.

        Returns:
            Tuple of (username, password, client_id, client_secret)
        """
        # Check if credentials exist in environment
        if self._credentials_exist():
            console.print("\n[yellow]Found existing credentials in .env file[/yellow]")
            use_existing = Confirm.ask("Use existing credentials?", default=True)

            if use_existing:
                return self._load_from_env()

        # Prompt for new credentials
        return self._prompt_for_credentials()

    def _credentials_exist(self) -> bool:
        """Check if all required credentials exist in environment."""
        required = ['REDDIT_CLIENT_ID', 'REDDIT_CLIENT_SECRET', 'REDDIT_USERNAME', 'REDDIT_PASSWORD']
        return all(os.getenv(key) for key in required)

    def _load_from_env(self) -> tuple:
        """Load credentials from environment variables."""
        self.client_id = os.getenv('REDDIT_CLIENT_ID')
        self.client_secret = os.getenv('REDDIT_CLIENT_SECRET')
        self.username = os.getenv('REDDIT_USERNAME')
        self.password = os.getenv('REDDIT_PASSWORD')

        return self.username, self.password, self.client_id, self.client_secret

    def _prompt_for_credentials(self) -> tuple:
        """Prompt user for Reddit credentials."""
        console.print("\n[bold cyan]Reddit App Credentials Setup[/bold cyan]")
        console.print("\nTo use this app, you need to create a Reddit app:")
        console.print("1. Go to: https://www.reddit.com/prefs/apps")
        console.print("2. Click 'create app' or 'create another app'")
        console.print("3. Choose 'script' as the app type")
        console.print("4. Set redirect uri to: http://localhost:8080")
        console.print("5. Copy the client ID (under the app name) and secret\n")

        # Get Reddit app credentials
        self.client_id = Prompt.ask("[yellow]Enter Reddit App Client ID[/yellow]")
        self.client_secret = Prompt.ask("[yellow]Enter Reddit App Client Secret[/yellow]", password=True)

        console.print("\n[bold cyan]Reddit Account Credentials[/bold cyan]\n")

        # Get user credentials
        self.username = Prompt.ask("[yellow]Enter Reddit Username[/yellow]")
        self.password = Prompt.ask("[yellow]Enter Reddit Password[/yellow]", password=True)

        # Ask to save credentials
        save_creds = Confirm.ask("\nSave credentials to .env file?", default=True)

        if save_creds:
            self._save_to_env()
            console.print("[green]✓[/green] Credentials saved to .env file")

        return self.username, self.password, self.client_id, self.client_secret

    def _save_to_env(self) -> None:
        """Save credentials to .env file."""
        with open(self.env_file, 'w') as f:
            f.write(f"REDDIT_CLIENT_ID={self.client_id}\n")
            f.write(f"REDDIT_CLIENT_SECRET={self.client_secret}\n")
            f.write(f"REDDIT_USERNAME={self.username}\n")
            f.write(f"REDDIT_PASSWORD={self.password}\n")
