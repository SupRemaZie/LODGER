import path from 'path';
import fs from 'fs/promises';

type Translations = Record<string, string>;

export async function getTranslation(
    lang: string,
    namespace: string,
    key: string,
    values?: Record<string, string>
): Promise<string> {
    const filePath = path.join(process.cwd(), 'messages',  `${lang}.json`);
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const messages: Translations = JSON.parse(fileContent);

    const root = messages[namespace];
    if (!root) throw new Error(`Namespace ${namespace} not found in file`);

    let text = getNestedValue(root, key) || key;

    if (values) {
        for (const [k, v] of Object.entries(values)) {
            text = text.replace(`{${k}}`, v);
        }
    }

    return text as string;
}

function getNestedValue(obj: string, key: string): string | undefined {
    const parts = key.split('.');
    let current: any = obj;
    for (const part of parts) {
        if (current[part] === undefined) return undefined;
        current = current[part];
    }
    return typeof current === 'string' ? current : undefined;
}