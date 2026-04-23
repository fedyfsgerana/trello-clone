CREATE TABLE
    users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

CREATE TABLE
    boards (
        id SERIAL PRIMARY KEY,
        user_id INT REFERENCES users (id) ON DELETE CASCADE,
        title VARCHAR(100) NOT NULL,
        description TEXT,
        color VARCHAR(50) DEFAULT '#0079BF',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

CREATE TABLE
    columns (
        id SERIAL PRIMARY KEY,
        board_id INT REFERENCES boards (id) ON DELETE CASCADE,
        title VARCHAR(100) NOT NULL,
        position INTEGER NOT NULL DEFAULT 0
    );

CREATE TABLE
    tasks (
        id SERIAL PRIMARY KEY,
        column_id INT REFERENCES columns (id) ON DELETE CASCADE,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        priority VARCHAR(20) DEFAULT 'medium',
        due_date DATE,
        position INTEGER NOT NULL DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );