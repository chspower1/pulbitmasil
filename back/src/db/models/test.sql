SELECT
{{#each columns}}
  {{this}}{{#unless @last}},{{/unless}}
{{/each}}
FROM {{table_name}}