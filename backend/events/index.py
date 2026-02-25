import json
import os
import psycopg2
from psycopg2.extras import RealDictCursor

SCHEMA = os.environ.get('MAIN_DB_SCHEMA', 't_p61000277_baza_site_project')

CORS_HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-Admin-Token',
}

ADMIN_TOKEN = os.environ.get('ADMIN_TOKEN', '')


def get_conn():
    return psycopg2.connect(os.environ['DATABASE_URL'], cursor_factory=RealDictCursor)


def check_admin(event):
    token = event.get('headers', {}).get('X-Admin-Token', '')
    return token == ADMIN_TOKEN and ADMIN_TOKEN != ''


def handler(event: dict, context) -> dict:
    """API для управления мероприятиями БАЗЫ. CRUD операции."""
    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': CORS_HEADERS, 'body': ''}

    method = event.get('httpMethod', 'GET')
    path = event.get('path', '/')
    parts = [p for p in path.strip('/').split('/') if p]
    event_id = parts[1] if len(parts) >= 2 else None

    conn = get_conn()
    cur = conn.cursor()

    try:
        # GET /events — список всех мероприятий
        if method == 'GET' and not event_id:
            cur.execute(f'SELECT * FROM {SCHEMA}.events ORDER BY sort_order ASC, id ASC')
            rows = [dict(r) for r in cur.fetchall()]
            return {
                'statusCode': 200,
                'headers': {**CORS_HEADERS, 'Content-Type': 'application/json'},
                'body': json.dumps(rows, ensure_ascii=False, default=str),
            }

        # GET /events/:id
        if method == 'GET' and event_id:
            cur.execute(f'SELECT * FROM {SCHEMA}.events WHERE id = %s', (event_id,))
            row = cur.fetchone()
            if not row:
                return {'statusCode': 404, 'headers': CORS_HEADERS, 'body': json.dumps({'error': 'Not found'})}
            return {
                'statusCode': 200,
                'headers': {**CORS_HEADERS, 'Content-Type': 'application/json'},
                'body': json.dumps(dict(row), ensure_ascii=False, default=str),
            }

        # POST /events — создать
        if method == 'POST':
            if not check_admin(event):
                return {'statusCode': 403, 'headers': CORS_HEADERS, 'body': json.dumps({'error': 'Forbidden'})}
            body = json.loads(event.get('body') or '{}')
            cur.execute(
                f'''INSERT INTO {SCHEMA}.events
                    (title, date_text, time_text, category, description, image, location, price, status, contact, sort_order)
                    VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s) RETURNING *''',
                (
                    body.get('title', ''),
                    body.get('date_text', ''),
                    body.get('time_text', ''),
                    body.get('category', ''),
                    body.get('description', ''),
                    body.get('image', ''),
                    body.get('location', ''),
                    body.get('price', 'Бесплатно'),
                    body.get('status', 'upcoming'),
                    body.get('contact', '+79503171377'),
                    body.get('sort_order', 0),
                ),
            )
            conn.commit()
            row = dict(cur.fetchone())
            return {
                'statusCode': 201,
                'headers': {**CORS_HEADERS, 'Content-Type': 'application/json'},
                'body': json.dumps(row, ensure_ascii=False, default=str),
            }

        # PUT /events/:id — обновить
        if method == 'PUT' and event_id:
            if not check_admin(event):
                return {'statusCode': 403, 'headers': CORS_HEADERS, 'body': json.dumps({'error': 'Forbidden'})}
            body = json.loads(event.get('body') or '{}')
            cur.execute(
                f'''UPDATE {SCHEMA}.events SET
                    title=%s, date_text=%s, time_text=%s, category=%s, description=%s,
                    image=%s, location=%s, price=%s, status=%s, contact=%s, sort_order=%s
                    WHERE id=%s RETURNING *''',
                (
                    body.get('title', ''),
                    body.get('date_text', ''),
                    body.get('time_text', ''),
                    body.get('category', ''),
                    body.get('description', ''),
                    body.get('image', ''),
                    body.get('location', ''),
                    body.get('price', 'Бесплатно'),
                    body.get('status', 'upcoming'),
                    body.get('contact', '+79503171377'),
                    body.get('sort_order', 0),
                    event_id,
                ),
            )
            conn.commit()
            row = cur.fetchone()
            if not row:
                return {'statusCode': 404, 'headers': CORS_HEADERS, 'body': json.dumps({'error': 'Not found'})}
            return {
                'statusCode': 200,
                'headers': {**CORS_HEADERS, 'Content-Type': 'application/json'},
                'body': json.dumps(dict(row), ensure_ascii=False, default=str),
            }

        # DELETE /events/:id
        if method == 'DELETE' and event_id:
            if not check_admin(event):
                return {'statusCode': 403, 'headers': CORS_HEADERS, 'body': json.dumps({'error': 'Forbidden'})}
            cur.execute(f'DELETE FROM {SCHEMA}.events WHERE id = %s', (event_id,))
            conn.commit()
            return {'statusCode': 200, 'headers': CORS_HEADERS, 'body': json.dumps({'ok': True})}

        return {'statusCode': 404, 'headers': CORS_HEADERS, 'body': json.dumps({'error': 'Not found'})}

    finally:
        cur.close()
        conn.close()
