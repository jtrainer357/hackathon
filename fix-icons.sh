#!/bin/bash

# Mass replace hugeicons with lucide-react equivalents

# Common icon mappings
declare -A icon_map=(
  ["Cancel01Icon"]="X"
  ["Home01Icon"]="Home"
  ["Home02Icon"]="Home"
  ["Calendar03Icon"]="Calendar"
  ["CalendarIcon"]="Calendar"
  ["Message01Icon"]="MessageSquare"
  ["MessageIcon"]="MessageSquare"
  ["UserMultiple02Icon"]="Users"
  ["UserMultipleIcon"]="Users"
  ["Settings01Icon"]="Settings"
  ["SettingsIcon"]="Settings"
  ["ChevronDownIcon"]="ChevronDown"
  ["ChevronDown"]="ChevronDown"
  ["Search01Icon"]="Search"
  ["SearchIcon"]="Search"
  ["PlusIcon"]="Plus"
  ["Stethoscope02Icon"]="Stethoscope"
  ["StethoscopeIcon"]="Stethoscope"
  ["SparklesIcon"]="Sparkles"
  ["MailIcon"]="Mail"
  ["Mail01Icon"]="Mail"
  ["PhoneIcon"]="Phone"
  ["Phone01Icon"]="Phone"
  ["SmsIcon"]="MessageSquare"
  ["CheckIcon"]="Check"
  ["AlertIcon"]="AlertCircle"
  ["InfoIcon"]="Info"
  ["FileIcon"]="FileText"
  ["File01Icon"]="FileText"
  ["DownloadIcon"]="Download"
  ["UploadIcon"]="Upload"
  ["Upload01Icon"]="Upload"
  ["TrashIcon"]="Trash2"
  ["Trash01Icon"]="Trash2"
  ["EditIcon"]="Edit"
  ["Edit01Icon"]="Edit"
  ["CloseIcon"]="X"
  ["MenuIcon"]="Menu"
  ["Menu01Icon"]="Menu"
  ["DotsVerticalIcon"]="MoreVertical"
  ["MoreVerticalIcon"]="MoreVertical"
  ["ArrowLeftIcon"]="ArrowLeft"
  ["ArrowRightIcon"]="ArrowRight"
  ["ArrowUpIcon"]="ArrowUp"
  ["ArrowDownIcon"]="ArrowDown"
  ["PlayIcon"]="Play"
  ["PauseIcon"]="Pause"
  ["MicrophoneIcon"]="Mic"
  ["Microphone01Icon"]="Mic"
  ["VolumeIcon"]="Volume2"
  ["LinkIcon"]="Link"
  ["ExternalLinkIcon"]="ExternalLink"
  ["CopyIcon"]="Copy"
  ["FilterIcon"]="Filter"
)

# Find all files with hugeicons imports
files=$(grep -r "from ['\"]hugeicons" src/ --include="*.tsx" --include="*.ts" -l)

for file in $files; do
  echo "Processing: $file"

  # Replace import statements
  sed -i '' 's/from "hugeicons-react"/from "lucide-react"/g' "$file"
  sed -i '' 's/from '\''hugeicons-react'\''/from '\''lucide-react'\''/g' "$file"
  sed -i '' 's/from "@hugeicons\/react"/from "lucide-react"/g' "$file"
  sed -i '' 's/from '\''@hugeicons\/react'\''/from '\''lucide-react'\''/g' "$file"

  # Apply icon name mappings
  for old_name in "${!icon_map[@]}"; do
    new_name="${icon_map[$old_name]}"
    # Replace in import statements
    sed -i '' "s/${old_name}/${new_name}/g" "$file"
  done
done

echo "✅ All icons migrated to lucide-react!"
