#!/bin/bash
# rename-posters.sh

# Перехід в папку з постерами
cd public/posters || { echo "Папка public/posters не знайдена!"; exit 1; }

counter=1

# Спочатку перейменовуємо всі файли в тимчасові назви (щоб уникнути конфліктів)
echo "Крок 1: Тимчасове перейменування..."
for file in *; do
  if [ -f "$file" ]; then
    # Перевіряємо чи це зображення
    if [[ "$file" =~ \.(jpg|jpeg|png|webp|gif|JPG|JPEG|PNG|WEBP|GIF)$ ]]; then
      mv "$file" "temp_$counter"
      ((counter++))
    fi
  fi
done

# Тепер перейменовуємо в фінальні назви
echo "Крок 2: Фінальне перейменування..."
counter=1
for file in temp_*; do
  if [ -f "$file" ]; then
    # Визначаємо розширення (беремо .jpg за замовчуванням)
    mv "$file" "poster-$counter.jpg"
    echo "✓ Створено: poster-$counter.jpg"
    ((counter++))
  fi
done

echo ""
echo "Готово! Перейменовано $((counter-1)) файлів"