# Reddit Saved Posts Organizer

Transform your saved Reddit content into a structured "second brain" knowledge base! This tool fetches all your saved posts and comments from Reddit and organizes them into easy-to-navigate markdown files, grouped by subreddit.

## Features

✨ **User-Friendly Interface** - Interactive CLI that guides you through the setup process

🔐 **Secure Authentication** - Credentials can be saved locally or entered each time

📥 **Complete Fetch** - Retrieves ALL your saved posts and comments (no limits!)

📁 **Smart Organization** - Content organized by subreddit into markdown files

📊 **Second Brain Structure** - Master indexes and structured directories for easy navigation

🎨 **Beautiful Output** - Rich terminal UI with progress indicators and colored output

## Prerequisites

- Python 3.8 or higher
- A Reddit account with saved posts/comments
- A Reddit app (we'll help you create one!)

## Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd Claude
   ```

2. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

## Quick Start

Simply run the main script:

```bash
python main.py
```

The app will guide you through:

1. **Reddit App Setup** (first time only)
   - Visit https://www.reddit.com/prefs/apps
   - Create a new app (type: script)
   - Copy your client ID and secret

2. **Login**
   - Enter your Reddit username and password
   - Optionally save credentials for future use

3. **Automatic Organization**
   - The app fetches all your saved content
   - Organizes it into the `output/` directory
   - Creates beautiful markdown files ready to explore!

## Output Structure

After running, you'll get a structured knowledge base:

```
output/
├── README.md                    # Overview and quick links
├── index/
│   ├── posts_index.md          # Master index of all posts
│   └── comments_index.md       # Master index of all comments
├── posts/
│   ├── Python.md               # Posts from r/Python
│   ├── MachineLearning.md      # Posts from r/MachineLearning
│   └── ...                     # One file per subreddit
└── comments/
    ├── AskReddit.md            # Comments from r/AskReddit
    ├── programming.md          # Comments from r/programming
    └── ...                     # One file per subreddit
```

## Features in Detail

### Posts Organization

Each post includes:
- Title and author
- Score (upvotes) and comment count
- Post date and flair
- Direct link to Reddit
- Full text content (for self posts)
- External URLs (for link posts)

Posts are sorted by score within each subreddit file.

### Comments Organization

Each comment includes:
- Comment author and score
- Original post title
- Comment date
- Direct link to context on Reddit
- Full comment text (formatted as quote)

Comments are sorted by score within each subreddit file.

### Master Indexes

The index files provide:
- Total counts of posts/comments
- List of all subreddits with content counts
- Quick links to each subreddit file

## Configuration

### Using Environment Variables

You can save your credentials in a `.env` file:

```bash
cp .env.example .env
# Edit .env with your credentials
```

The app will automatically detect and use these credentials.

### Manual Entry

Simply run `python main.py` without a `.env` file, and the app will prompt you for credentials. You can choose to save them at that time.

## Privacy & Security

- Your credentials are only stored locally in `.env` (never transmitted anywhere except to Reddit's official API)
- The `.env` file is gitignored by default
- You can delete the `.env` file anytime and re-enter credentials
- All communication uses Reddit's official PRAW library with secure authentication

## Troubleshooting

### "Failed to authenticate"

- Double-check your Reddit username and password
- Verify your app client ID and secret are correct
- Make sure you created a "script" type app, not a "web app"

### "No saved posts or comments found"

- Make sure you have actually saved posts/comments on Reddit
- Try saving a test post and running again

### Rate Limiting

- Reddit has rate limits, but PRAW handles this automatically
- If you have thousands of saved items, the fetch may take a few minutes

## Development

### Project Structure

```
reddit_organizer/
├── __init__.py
├── config.py           # Credential management
├── reddit_client.py    # PRAW integration
└── organizer.py        # Second brain organization logic

main.py                 # CLI entry point
requirements.txt        # Python dependencies
```

### Dependencies

- **praw**: Reddit API wrapper
- **python-dotenv**: Environment variable management
- **rich**: Beautiful terminal UI

## Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests

## License

MIT License - feel free to use and modify as you wish!

## Acknowledgments

- Built with [PRAW](https://praw.readthedocs.io/) - The Python Reddit API Wrapper
- UI powered by [Rich](https://rich.readthedocs.io/)

---

**Happy organizing! 📚✨**
