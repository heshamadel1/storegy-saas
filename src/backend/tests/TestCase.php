<?php

namespace Tests;

use Illuminate\Foundation\Testing\TestCase as BaseTestCase;
use RuntimeException;

abstract class TestCase extends BaseTestCase
{
    protected function refreshApplication(): void
    {
        parent::refreshApplication();

        $connection = config('database.default');
        $database = (string) config("database.connections.{$connection}.database");

        if (! str_ends_with($database, '_testing')) {
            throw new RuntimeException(
                "Refusing to run tests on database [{$database}]. Test databases must end with _testing."
            );
        }
    }
}
